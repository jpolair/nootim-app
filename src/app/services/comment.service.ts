import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  public createComment(commentToSend: Comment) {
    commentToSend.date = new Date();
    return this.http.post(this.baseUrl + 'api/comments', commentToSend);
  }

  public getMessageComments(messageId: string) {
    return this.http.get(this.baseUrl + 'api/comments/messages/' + messageId);
  }


}
