import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private socket: Socket) { }

    fetchUsers(): Observable<any> {
        return this.socket.fromEvent('users')
    }

    getMe(): Observable<any> {
        return this.socket.fromEvent('loggedInUser').pipe(take(1))
    }
}
