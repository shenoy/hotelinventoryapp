import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[] ,  price:number): RoomList[] {
    return rooms.filter(x=>x.price<=price);
  }

}
