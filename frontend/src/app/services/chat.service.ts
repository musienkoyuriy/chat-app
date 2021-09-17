import { Injectable } from '@angular/core';
import { map, mergeMap, pluck } from 'rxjs/operators'
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, of, merge } from 'rxjs';
import { Message } from '../interfaces/message';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ChatService {
    BACKEND_URL = 'http://localhost:3000'

    constructor(
        private socket: Socket,
        private http: HttpClient
    ) {
    }

    sendMessage(message: string, userID: string): void {
        this.socket.emit('messageSent', {
            messageText: message,
            userID
        })
    }

    getChatMessages(): Observable<any> {
        return merge(
            this.http.get(`${this.BACKEND_URL}/api/messages`),
            this.socket.fromEvent('messages')
        )
    }
}
