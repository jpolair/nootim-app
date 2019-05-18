import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MyMessage } from '../interfaces/message';
import { ResponseAPI } from '../interfaces/custom-response';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public me: any;
  public users: any;
  public openFormMessage = false;
  public messageFormGroup: FormGroup;
  public messages: MyMessage[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private socketService: SocketService) {
  }

  public ngOnInit() {
    this.socketService.connect();
    this.socketService.listen('messageCreated')
    .subscribe( (data: ResponseAPI) => {
      this.messageService.getMessages()
      .subscribe((messages: ResponseAPI) => {
        this.messages = messages.data;
      });
    });
    this.messageFormGroup = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.userService.getUsers()
      .subscribe((users: ResponseAPI) => {
        this.users = users.data;
      });
    this.userService.getMe()
      .subscribe((user: ResponseAPI) => {
        this.me = user.data;
      }, err => {
        console.log('error', err);
      });
    this.messageService.getMessages()
      .subscribe((messages: ResponseAPI) => {
        this.messages = messages.data;
      }, err => {
        console.log('errror', err);
      });
  }

  public logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  public addMessage() {
    this.openFormMessage = !this.openFormMessage;
  }

  public addImage() {
    console.log('addImage');
  }

  public postMessage() {
    if (this.messageFormGroup.valid) {
      const contentMessage = this.messageFormGroup.controls.content.value;
      this.messageService.createMessage(contentMessage)
        .subscribe(message => {
          if (message) {
            this.openFormMessage = false;
            this.messageFormGroup.reset({ content: '' });
            this.socketService.emit('messageCreated', message);
          }
        }, err => {
          console.log('err ', err);
        });
    }
  }
}
