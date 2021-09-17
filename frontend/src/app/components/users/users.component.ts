import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  onlineUsers$: Observable<User[]> = new Observable<User[]>()

  @Output('userSelected')
  userSelected: EventEmitter<string> = new EventEmitter<string>()

  @Input() ownUser: User | null = {
    id: '',
    userName: '',
    active: false
  }

  trackByUser: TrackByFunction<User> = (index: number, user: User) => user.id;

  constructor(private usersService: UsersService) {
    this.usersService.fetchUsers()
  }

  ngOnInit(): void {
    this.onlineUsers$ = this.usersService.fetchUsers().pipe(
      map((users: User[]) => {
        return users.filter((user: User) => user.active)
      })
    )
  }

  selectUser(user: string) {
    this.userSelected.emit(user)
  }
}
