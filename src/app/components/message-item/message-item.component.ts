import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MyMessage } from '../../interfaces/message';
import { Comment } from '../../interfaces/comment';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit, OnChanges {
  @Input() flash: any;

  public owner: any;
  public eyesNumber = 3;
  public isOpenAddCom = false;
  public comments: Comment[];

  constructor(private userService: UserService, private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getMessageComments(this.flash._id)
    .subscribe((data: any) => {
      this.comments = data.commentsFetched;
    });
  }

  ngOnChanges() {
    if (this.flash && this.flash.hasOwnProperty('owner')) {
      this.owner = `${this.flash.owner.firstname} ${this.flash.owner.lastname}`;
    }
  }

  public addEye() {
    console.log('eye added');
  }

  public addCom() {
    this.isOpenAddCom = !this.isOpenAddCom;
    console.log('com added');
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
