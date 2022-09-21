import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id!:number;

  id$ =this.router.paramMap.pipe(
    map(params=>params.get('id'))
  )

  constructor(private router : ActivatedRoute) { }

  ngOnInit(): void {
  
    // this.router.params.subscribe((params)=>{this.id=params['id'];});
  }

}
