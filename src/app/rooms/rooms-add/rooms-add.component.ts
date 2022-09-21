import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

  room : RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    rating: 0,
    roomNumber: ''
  }
  

  constructor(private roomsService:RoomsService) { }

  successMessage: string = '';

  ngOnInit(): void {
  }

  AddRoom(roomsForm: NgForm){
    this.roomsService
    .addRoom(this.room)
    .subscribe((data)=>{
      this.successMessage = "Room addded successfully!";
      roomsForm.reset();
    })
  }

}
