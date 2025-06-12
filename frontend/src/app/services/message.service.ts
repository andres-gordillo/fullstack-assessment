import { computed, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, EMPTY } from "rxjs";
import { switchMap, catchError } from "rxjs";
import { Message, CreateMessageResponse } from "../models/message.model";
import { toSignal} from '@angular/core/rxjs-interop'



@Injectable({
    providedIn: 'root'
})

export class MessageService {
    private apiUrl = 'http://localhost:3000/main/v1/messages'


    // State
    private messages = signal<Message[]>([]);
    private error = signal<string | null>(null)
    private loading = signal(false)


    readonly checkLoading = this.loading.asReadonly()

    private dataRefresh$ = new BehaviorSubject<void>(undefined)

    private messagesData = toSignal(
        this.dataRefresh$.pipe(
            switchMap(() => {
                this.loading.set(true)
                this.error.set(null)
                return this.http.get<Message[]>(this.apiUrl, {withCredentials: true})
            }),
            catchError(e => {
                this.error.set(e)
                this.loading.set(false)
                return EMPTY
            })
        ),
        {initialValue: []}
    )

    constructor(private http: HttpClient) {
        const newMessages = this.messagesData()

        this.messages.set(newMessages)
        this.loading.set(false)
    }

    pullMessages(): void {
        this.dataRefresh$.next()
    }




}