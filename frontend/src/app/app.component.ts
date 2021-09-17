import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedUser = ''

  loggedInUser$: Observable<User> = new Observable<User>()

  constructor(private userService: UsersService) {
    this.loggedInUser$ = this.userService.getMe()
  }

  onUserSelect(user: string): void {
    this.selectedUser = user
  }
}
