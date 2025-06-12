import { Injectable, signal, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of, tap, switchMap, catchError } from "rxjs";
import { Message, CreateMessageResponse } from "../models/message.model";


@Injectable({
    providedIn: 'root'
})

export class MessageService {
    private API_URL = 'http://localhost:3000/main/v1'
    private sessionInitialized = signal(false);

    private messages = signal<Message[]>([]);
    private error = signal<string | null>(null)
    private loading = signal(false)

    readonly gatheredMessages = this.messages.asReadonly()
    readonly checkLoading = this.loading.asReadonly()

    constructor(private http: HttpClient) {}
    
    private hasSessionCookie(): boolean {
        if(!!document) {
            return document.cookie.includes('_test_session=');
        } else {
            return false;
        }
    }


    private initializeSession(): Observable<any> {
        if (this.sessionInitialized() || this.hasSessionCookie()) {
            if (!this.sessionInitialized() && this.hasSessionCookie()) {
                this.sessionInitialized.set(true);
            }
            return of(null);
        }
        return this.http.get(`${this.API_URL}/messages`, {
            withCredentials: true,
            params: new HttpParams().set('page', '1').set('per_page', '1'),
            observe: 'response'
        }).pipe(
            tap(() => {
                this.sessionInitialized.set(true);
            }),
            catchError(error => {
                console.error('Session initialization failed:', error);
                throw error;
            }),
            switchMap(() => of(null))
        );
    }



    getMessages(page: number = 1, perPage: number = 20): Observable<Message[]> {
        return this.initializeSession().pipe(
            switchMap(() => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
                this.loading.set(true);
                this.error.set(null);

                const params = new HttpParams()
                    .set('page', page.toString())
                    .set('per_page', perPage.toString());

                const options = {
                    params,
                    headers,
                    withCredentials: true,
                    observe: 'response' as const
                };
                return this.http.get<Message[]>(`${this.API_URL}/messages`, options);
            }),
            tap((response: any) => {
                const messages = response.body || response;
    
                if (page === 1) {
                    this.messages.set(messages);
                } else {
                    this.messages.update(current => [...current, ...messages]);
                }
                this.loading.set(false);
            }),
            catchError(e => {
                this.error.set(e.error?.error || 'Failed to load messages');
                this.loading.set(false);
                throw e;
            }),
            switchMap((response: any) => of(response.body || response))
        );
    }

    sendMessage(messageContent: string, phoneNumber: string): Observable<Message> {
        return this.initializeSession().pipe(
            switchMap(() => {
                const messageData: CreateMessageResponse = {
                    message: {
                        message_content: messageContent,
                        phone_number: phoneNumber
                    }
                };
                return this.http.post<Message>(`${this.API_URL}/messages`, messageData, { 
                    withCredentials: true,
                    observe: 'response'
                });
            }),
            tap((response: any) => {
                const newMessage = response.body || response;
                
                this.messages.update(messages => {
                    const cleanMessages = messages ?? [];
                    return newMessage ? [newMessage, ...cleanMessages] : cleanMessages;
                });
            }),
            catchError(e => {
                this.error.set(e.error?.error || 'Failed to send message');
                this.loading.set(false);
                throw e;
            }),
            switchMap((response: any) => of(response.body || response))
        );
    }
}