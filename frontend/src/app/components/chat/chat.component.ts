import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TrackByFunction, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from '../../interfaces/message';
import { Observable, of } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnChanges {
  userMessage: FormControl;
  messages$: Observable<Message[]>;

  @Input() selectedUser = ''
  @Input() ownUser: User | null;

  @ViewChild('messagesList') messagesList;
  @ViewChild('userInput') userInput;

  emojiPopupVisible: boolean = false;

  constructor(private chatService: ChatService) {
    this.userMessage = new FormControl('')
    this.chatService.fetchChatMessages()
    this.messages$ = this.chatService.messagesList$
  }

  scrollToBottom = () => {
    const chatElement = this.messagesList.nativeElement;
    chatElement.scrollTo = ({
      top: chatElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  trackByMessage: TrackByFunction<Message> = (index: number, message: Message) => message.id;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.selectedUser) {
      return
    }
    const userName = changes.selectedUser.currentValue
    if (this.ownUser) {
      if (userName != '' && userName != this.ownUser?.userName) {
        this.addMention(userName)
      }
    }
  }

  private addMention(userName: string): void {
    const messageText = this.userMessage.value.trim()

    if (!messageText.startsWith(`@${userName}`)) {
      this.userMessage.setValue(`@${userName} ${messageText}`)
    }
  }

  sendMessage(): void {
    const newMessage = this.userMessage.value.trim()

    if (!newMessage) {
      return
    }

    if (this.ownUser) {
      this.chatService.sendMessage(newMessage, this.ownUser);
    }
    this.userMessage.setValue('')
    this.scrollToBottom()
    this.userInput.nativeElement.focus()
  }

  toggleEmojiPopup(): void {
    this.emojiPopupVisible = !this.emojiPopupVisible;
  }

  onEmojiSelect(emoji: string) {
    this.userMessage.patchValue(`${this.userMessage.value} ${emoji}`);
  }

  onEmojiClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
