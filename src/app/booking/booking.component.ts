import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm! : FormGroup;


  get guests(){
    return this.bookingForm.get('guests') as FormArray;
  }


  constructor(private config: ConfigService, 
    private fb:FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    const roomId= this.route.snapshot.paramMap.get('roomId');
    this.bookingForm = this.fb.group({

      roomId:[{value: roomId, disabled: true}, {validators : [Validators.required]}],
      guestName:  ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar("*")] ],
      guestEmail: ['', {updateOn: 'blur', validators : [Validators.required, Validators.email]}],
      checkInDate: [''],
      checkOutDate: [''],
      bookingStatus: [''],
      bookingAmount : [''],
      bookingDate : [''],
      mobileNumber: ['', {updateOn: 'blur'}],
      address: this.fb.group({      
      addressLine : ['', {validators: [Validators.required]}],
      addressLine2 : [''],
      city : ['',{validators: [Validators.required]}],
      country: ['',{validators: [Validators.required]}],
      zipcode :  [''],
      }),
      guests : this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, {validators: [Validators.requiredTrue]})    
    }, {updateOn: 'blur', validators: [CustomValidator.ValidateDate]}
    
    )

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe(data=>{
    //   this.bookingService.bookRoom(data).subscribe(data=>console.log(data));

    // });

    // this.bookingForm.valueChanges.pipe(exhaustMap(data=>this.bookingService.bookRoom(data))).subscribe(data=>console.log(data));

  }

  addBooking(){
    console.log(this.bookingForm.getRawValue());
    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe(data=>console.log(data));
    // // this.bookingForm.reset({
    //   roomId:'2',
    //   guestName:  '',
    //   guestEmail: '',
    //   checkInDate: '',
    //   checkOutDate: '',
    //   bookingStatus: '',
    //   bookingAmount : '',
    //   bookingDate : '',
    //   mobileNumber: '',
    //   address:{ 
    //   addressLine : '',
    //   addressLine2 : '',
    //   city : '',
    //   country: '',
    //   zipcode :  '',
    //   },
    //   guests: [],
    //   tnc: false,
    // // });
  }

  getBookingData(){
    this.bookingForm.patchValue({
      guestName:  '',
      guestEmail: 'test@gmail.com',
      checkInDate: new Date('10-3-2020'),
      checkOutDate: new Date('10-3-2020'),
      bookingStatus: '',
      bookingAmount :678,
      bookingDate : new Date('10-3-2020'),
      mobileNumber: '',
      address:{ 
      addressLine : '',
      addressLine2 : '',
      city : '',
      country: '',
      zipcode :  '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest(){
    this.guests.push(      
      this.addGuestControl()      
      )   
  }


  addGuestControl(): any {
    return this.fb.group({       
    guestName:  ['',{validators: [Validators.required]}], 
    age: [''], });
  }

  removeGuest(i:number){
    this.guests.removeAt(i);
  }

  addPassport(){
    this.bookingForm.addControl('passport',new FormControl(''));
  }

  deletePassport(){
    if(this.bookingForm.get('passport')) this.bookingForm.removeControl('passport');
  }


}
