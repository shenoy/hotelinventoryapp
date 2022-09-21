import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms/rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms:RoomList[] | null = [];

  @Input() title:string = "";

  @Output() selectedRoom = new EventEmitter<RoomList>();

  @Input() price = 0;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
  }

  selectRoom(room: RoomList){
    this.selectedRoom.emit(room);
  }


  ngOnDestroy(): void {    
    console.log('onDestroy is called');
  }


}
