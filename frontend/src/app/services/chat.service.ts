import { Injectable } from '@angular/core';
import { concatMap, map, mergeMap, pluck } from 'rxjs/operators'
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, of, merge } from 'rxjs';
import { Message } from '../interfaces/message';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';


@Injectable({
    providedIn: 'root'
})
export class ChatService {
    BACKEND_URL = 'http://localhost:3000'

    private messagesListSubject$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])
    messagesList$: Observable<Message[]>;
    constructor(
        private socket: Socket,
        private http: HttpClient
    ) {
        this.messagesList$ = this.messagesListSubject$.asObservable()
    }

    sendMessage(message: string, user: User): void {
        this.socket.emit('messageSent', {
            messageText: message,
            userID: user.id
        })
    }

    fetchChatMessages(): void {
        this.http.get(`${this.BACKEND_URL}/api/messages`)
            .pipe(
                pluck('messages')
            )
            .pipe(map(list => this.messagesListSubject$.next(list as Message[])),
                concatMap(() => this.socket.fromEvent('messageSent')
                    .pipe(
                        map(newMessage => {
                            this.messagesListSubject$.next([
                                ...this.messagesListSubject$.getValue(),
                                newMessage
                            ] as Message[])
                        })
                    )
                ))
            .subscribe()
    }
}
