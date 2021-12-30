import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { PostModel } from 'src/app/models/postModel/postModel';
import { Rental } from 'src/app/models/rental/rental';
import { Singleton } from 'src/app/models/rentConst';

import { CarInfoService } from 'src/app/services/carInfo/car-info.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  car: CarInfo;
  rentDate: string;
  returnDate: string;
  rentDatePost: Date;
  returnDatePost: Date;
  shouldRouteToPayment:boolean = false;
  currentPostModel: PostModel;
  rentalToAdd: Rental = new Rental();
  rentQueryResult: Rental;
  routerLink: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carInfoService: CarInfoService,
    private rentService: RentalService,
    private toastr: ToastrService
  ) {
    this.rentDate = new Date().toJSON().slice(0, 10);
    this.returnDate = this.addDays(new Date(), 1).toJSON().slice(0, 10);
  }
  //#region manipulate Methods
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
  stringToDate(dateStr: string): Date {
    return new Date(dateStr);
  }
  dateWarning() {
    this.toastr.error('Error', 'Return date before Rent Date');
  }
  notAvaliableWarning() {
    this.toastr.error(
      '',
      'This vehicle is not avalible in entered date interval '
    );
  }
  //#endregion

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carId']) {
        this.carInfoService
          .getCarDetailsById(param['carId'])
          .subscribe((res) => {
            this.car = res.data;
            this.getRentalByCarId(param['carId']);
          });
          Singleton.RENT.carId=Number(param['carId']);
        this.rentalToAdd.carId = Number(param['carId']);
      }
    });
  }
//#region Validation
  controlDates(): boolean {
    this.returnDatePost = new Date(this.returnDate);
    this.rentDatePost = new Date(this.rentDate);
    let rentDays =
      (this.returnDatePost.valueOf() - this.rentDatePost.valueOf()) /
      (24 * 60 * 60 * 1000);
    if (rentDays <= 0) {
      return false;
    }
    return true;
  }

  checkRental(rental: Rental): boolean {
    if (!this.controlDates()) {
      this.dateWarning();
      return false;
    }
    if (!this.rentDateAvaliable(rental, this.rentQueryResult)) {
      this.notAvaliableWarning();
      return false;
    }
    
    return true;
  }
  rentDateAvaliable(rental: Rental, rentQueryResult: Rental): boolean {
    if (rentQueryResult!==null) {
      return (
        new Date(rentQueryResult.returnDate).valueOf() <
        new Date(rental.rentDate).valueOf()
      );
    }
    return true;
  }
  //#endregion
  createRental(rentDate: string, returnDate: string, customerId: number) {
    let rental = new Rental();
    rental.customerId = customerId;
    rental.rentDate = rentDate;
    rental.returnDate = returnDate;
    this.rentalToAdd = rental;
    this.rentalToAdd.carId = Singleton.RENT.carId;
    console.log(this.rentQueryResult);
    if (this.checkRental(this.rentalToAdd)) {
      console.log(this.checkRental(this.rentalToAdd));
      Singleton.RENT=this.rentalToAdd;

      console.log(Singleton.RENT);
      this.shouldRouteToPayment = true;
    }
  }
  getRentalByCarId(carId: number) {
    this.rentService.getRentalByCarId(carId).subscribe((res) => {
      this.rentQueryResult = res.data;
    });
  }
 
  paymentLink(rentalAvaliable: boolean):string {
    if (rentalAvaliable) {
      return '/pay/' + Singleton.RENT.carId.toString();
    } 
    return 'a value to not route';
  }
}
