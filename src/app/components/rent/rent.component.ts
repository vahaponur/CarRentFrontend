import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarInfo } from 'src/app/models/carInfo/carInfo';

import { CarInfoService } from 'src/app/services/carInfo/car-info.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  car: CarInfo;
  rentDate:string;
  returnDate:string;
  rentDatePost:Date;
  returnDatePost:Date;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carInfoService: CarInfoService,
    private toastr:ToastrService
  )
   {
    this.rentDate = new Date().toJSON().slice(0,10);
    this.returnDate = this.addDays(new Date(),1).toJSON().slice(0,10);
   }
   addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carId']) {
        this.carInfoService
          .getCarDetailsById(param['carId'])
          .subscribe((res) => {
            this.car = res.data;
          });
          
      }
    });
  }
  controlDates():boolean{
   this.returnDatePost = new Date(this.returnDate);
   this.rentDatePost = new Date(this.rentDate);
   let rentDays = (this.returnDatePost.valueOf() - this.rentDatePost.valueOf())/ (24*60*60*1000);
    if (rentDays <= 0) {
      return false
    }
    return true;
  }
  dateWarning(){
    if (!this.controlDates()) {
      this.toastr.error("Error",'Return date before Rent Date');
      
    }
  }


}
