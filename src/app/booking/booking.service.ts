import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {  

  }

  bookRoom(booking: any){
    return this.http.post("https://jsonplaceholder.typicode.com/posts", booking);
  }
}
