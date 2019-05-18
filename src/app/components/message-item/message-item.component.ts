import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MyMessage } from '../../interfaces/message';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { ResponseAPI } from 'src/app/interfaces/custom-response';
import { MessageService } from 'src/app/services/message.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit, OnChanges {
  @Input() flash: any;

  public owner: any;
  public eyesNumber = 0;
  public isOpenAddCom = false;
  public comments: Comment[];

  constructor(private commentService: CommentService, private messageService: MessageService, private socketService: SocketService) { }

  ngOnInit() {
    this.commentService.getMessageComments(this.flash._id)
    .subscribe((comments: ResponseAPI) => {
      this.comments = comments.data;
    });
    this.socketService.listen('messageUpdated')
    .subscribe( (data: any) => {
      this.messageService.getMessageById(data.id)
      .subscribe( (flash: ResponseAPI) => {
        if (this.flash._id === data.id) {
        this.flash.hearts = flash.data.hearts;
        }
      });
    });
  }

  ngOnChanges() {
    if (this.flash && this.flash.hasOwnProperty('owner')) {
      this.owner = `${this.flash.owner.firstname} ${this.flash.owner.lastname}`;
    }
  }

  public addEye(id: string) {
    this.messageService.updateHeart(id, localStorage.getItem('nootim-userId')).subscribe(() => {
      this.socketService.emit('messageUpdated', { id });
    });
  }

  public addCom() {
    this.isOpenAddCom = !this.isOpenAddCom;
  }

  public sendComment(comment: string) {
    const commentToSend = {
      messageId: this.flash._id,
      ownerMessage: this.flash.owner._id,
      ownerComment: localStorage.getItem('nootim-userId'),
      content: comment,
      date: null
    };
    this.commentService.createComment(commentToSend)
    .subscribe(data => {
      this.isOpenAddCom = false;
    });
  }

}
