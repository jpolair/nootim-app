import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MyMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getMessages() {
    return this.http.get(this.baseUrl + 'api/messages');
  }

  public createMessage(messageToCreate: MyMessage) {
    const message = {
      content: messageToCreate,
      owner: localStorage.getItem('nootim-userId'),
      clubId: localStorage.getItem('nootim-clubId')
    };
    return this.http.post(this.baseUrl + 'api/messages', message);
  }

  public getMessageById(id: string) {
    return this.http.get(this.baseUrl + 'api/messages/' + id);
  }

  public deleteMessage(id: string) {
    return this.http.delete(this.baseUrl + 'api/messages' + id);
  }
}
