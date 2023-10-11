import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscribers } from './Subscribers';
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private baseURL = "http://localhost:8080/Subscribers";

  constructor(private httpClient: HttpClient) { }

  getSubscribersList(): Observable<Subscribers[]> {
    return this.httpClient.get<Subscribers[]>(`${this.baseURL}/mobileSubscribers`);
  }

  addNewSubscriber(newSubscriber: FormGroup): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/addNewSubscriber`, newSubscriber);
  }

  updateSubscriber(updatedSubscriber: FormGroup, id: number): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, updatedSubscriber);
  }


  deleteSubscriber(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  getSubscriberById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-HTTP-Method-Override': 'GET'
    });

    return this.httpClient.get(`${this.baseURL}/${id}`, { headers });
  }
}
