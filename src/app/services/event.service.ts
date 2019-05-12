import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getEvents() {
    return this.http.get(this.baseUrl + 'api/events');
  }

  public createEvent(newEvent) {
    return this.http.post(this.baseUrl + 'api/event', newEvent);
  }

  public getEventById(id: string) {
    return this.http.get(this.baseUrl + 'api/events/' + id);
  }

  public updateEvent(eventToUpdate) {
    return this.http.put(this.baseUrl + 'api/events/' + eventToUpdate.id, eventToUpdate);
  }

  public deleteEvent(id: string) {
    return this.http.delete(this.baseUrl + 'api/events/' + id);
  }
}
