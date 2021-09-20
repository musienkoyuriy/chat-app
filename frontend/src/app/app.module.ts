import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import { UsersComponent } from './components/users/users.component';
import { UsersService } from './services/users.service';
import { ChatComponent } from './components/chat/chat.component';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
    MatInputModule,
    MatButtonModule,
    MatListModule,
    PickerModule,
    EmojiModule
  ],
  providers: [
    ChatService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
