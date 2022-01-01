import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs';
import { Car } from 'src/app/models/car/car';
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
  lastRentOfCar: Rental = new Rental();
  currentCarInfo: CarInfo;
  paymentLinkInfo:string
  rentForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carInfoService: CarInfoService,
    private rentService: RentalService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}
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
    this.createForm();
    this.activatedRoute.params.subscribe((param) => {
      if (param['carId']) {
        let carId = param['carId'];
        this.getLastRental(carId);
        this.getCurrentCarInfo(carId);
        Singleton.RENT.carId = carId;
      }
    });
  }
  //#region Validation
  controlDates(rentD: string, returnD: string): boolean {
    let returnDate = new Date(returnD);
    let rentDate = new Date(rentD);
    let rentDays =
      (returnDate.valueOf() - rentDate.valueOf()) / (24 * 60 * 60 * 1000);
    if (rentDays <= 0) {
      this.toastr.error('Rent date cannot be after or same as return date');
      return false;
    }
    return true;
  }

  rentDateAvaliable(
    rentD: string,
 
    rentQueryResult: Rental
  ): boolean {
    let rentDate = new Date(rentD);
    let isAvaliable = true;
    if (rentQueryResult !== null) {
       isAvaliable =
        new Date(rentQueryResult.returnDate).valueOf() <
        new Date(rentDate).valueOf();
        if (!isAvaliable) {
          this.toastr.error("This car not avaliable in the required interval")
        }
    }

    return isAvaliable;
  }

  //#endregion

  //#region GetVariables

  getLastRental(carId: number) {
    this.rentService.getLastRentalByCarId(carId).subscribe((res) => {
      if (res.data) {
      this.lastRentOfCar = res.data; 
      }

    });
  }
  getCurrentCarInfo(carId: number) {
    this.carInfoService.getCarDetailsById(carId).subscribe((res) => {
      this.currentCarInfo = res.data;
    });
  }
  //#endregion

  createForm() {
    this.rentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  setRent():boolean {
    if (this.rentForm.valid) {
      console.log(this.rentForm.value);
      let rent:Rental = Object.assign({}, this.rentForm.value);
      if (this.rentDateAvaliable(rent.rentDate,this.lastRentOfCar)
      &&this.controlDates(rent.rentDate,rent.returnDate)) {
        Singleton.RENT.customerId=3;
        Singleton.RENT.rentDate=rent.rentDate;
        Singleton.RENT.returnDate=rent.returnDate;
        return true;
      }
    }
   
    return false;
  }
  paymentLink(){
    if (this.setRent()) {
      this.paymentLinkInfo='/pay/'+Singleton.RENT.carId;
      this.router.navigateByUrl(this.paymentLinkInfo);
      return true;
    }
    this.paymentLinkInfo = "/rent/"+this.currentCarInfo.carId;

    return false;
    
  }
}
