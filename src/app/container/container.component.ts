import { AfterContentInit, Component, OnInit, ViewChild, ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {


  @ContentChild(EmployeeComponent) employee!:EmployeeComponent;

  constructor(@Host() private roomsService: RoomsService) {

   }

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName="Rick";
  }

  ngOnInit(): void {
  }

}
