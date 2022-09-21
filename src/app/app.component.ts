import {  Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { LoggerService } from './logger.service';
import {localStorageToken} from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{


  constructor(@Optional() private loggerService: LoggerService,
  
  @Inject(localStorageToken) private localStorage : any, 
  private initService : InitService ,
  private config: ConfigService,
  private router:Router
  ){
    console.log(initService.config);
  }

  ngOnInit(): void {
    // this.router.events.subscribe(event=>console.log(event));

    this.router.events.pipe(
      filter(event=>event instanceof NavigationStart)
    ).subscribe(e=>console.log("Navigation Started"));

    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd)
    ).subscribe(e=>console.log("Navigation Completed"));

    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = "Hilton Hotels";
    this.localStorage.setItem('name', 'Hilton');
  }
  
  title = 'hotelinventoryapp';
  role='Admin';
  // @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }

  @ViewChild('name',{static:true}) name!:ElementRef;
}
