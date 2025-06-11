import { Signal, computed, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { switchMap, catchError } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class MessageService {
    
}