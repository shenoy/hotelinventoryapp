import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { HeaderComponent } from '../header/header.component';
import {Room, RoomList} from './rooms';
import { RoomsService } from './services/rooms.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {


  roomList: RoomList[] = [];

  totalBytes = 0;

  subscription!:Subscription;

  error$ : Subject<string> = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err)=>{
      console.log(err);
      this.error$.next(err.message);
      return of([]);    
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$=  this.roomsService.getRooms$
  .pipe(map((rooms) => rooms.length)
  );

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();

  });

  constructor(private roomsService: RoomsService, 
    private config: ConfigService
    ){
  // this.subscription =  this.roomsService.getRooms$.subscribe((x : RoomList[])=>{
  //     this.roomList = x;
    // });

  }


  ngOnInit(): void {
this.roomsService.getPhotos().subscribe(event=>{

  switch(event.type){
    case HttpEventType.Sent : {
      console.log("Request has been made");
      break;
    }

    case HttpEventType.ResponseHeader : {
      console.log("Request success");
      break;
    }


    case HttpEventType.DownloadProgress : {
      console.log("Response Header was received");
      this.totalBytes = event.loaded;
      break;
    }

    case HttpEventType.Response : {
      console.log(event.body);
      break;
    }

  }

})

    this.stream.subscribe({
      next: x=>console.log(x),
      complete: ()=>console.log("complete"),
      error: err=>console.log(err)
    });
  }



  hotelName = "Hilton";
  numberOfRooms = 10;
  hideRooms=  false;
  rooms : Room = {
    availableRooms : 10,
    bookedRooms : 5,
    totalRooms: 20
  }




  title= "Room List";

  selectedRoom!:RoomList;
   
  ngAfterViewChecked(): void {
     console.log('ngAfterViewChheked is called');
  }
  
  ngDoCheck(): void {
    console.log('onChanges is called');
  }


  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;


  toggle(){

    this.hideRooms = !this.hideRooms;
    this.title = "Room List";

  }


selectRoom(room:RoomList){
  this.selectedRoom = room;
}

addRoom(){

  const room: RoomList  ={
    roomNumber: '3',
    roomType: 'Private Suite',
    amenities: "AC, Wifi",
    price: 15000,
    photos: 'https://unsplash.com/photos/JIUjvqe2ZHg',
    checkInTime: new Date('11-Nov-2021'),
    checkOutTime: new Date('12-Nov-2021'),
    rating: 4.4
  };

  this.roomsService.addRoom(room).subscribe(data=>{
    this.roomList = data;
  });
}

editRoom(){

  const room: RoomList  ={
    roomNumber: '3',
    roomType: 'Deluxe Room',
    amenities: "AC, Wifi",
    price: 500,
    photos: 'https://unsplash.com/photos/JIUjvqe2ZHg',
    checkInTime: new Date('11-Nov-2021'),
    checkOutTime: new Date('12-Nov-2021'),
    rating: 4.6
  };

  this.roomsService.editRoom(room).subscribe(data=>{
    this.roomList = data;
  });

}


deleteRoom(){
  this.roomsService.delete('3').subscribe(data=>{
    this.roomList = data;
  })
}



ngAfterViewInit(): void {
  this.headerComponent.title = "Rooms view";
  this.headerChildrenComponent.forEach(x=>x.title="Rooms Child");
}

ngOnDestroy(){
  if(this.subscription){
    this.subscription.unsubscribe;
  }
}

}
