import { Component, OnInit } from '@angular/core';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { CarInfoService } from 'src/app/services/carInfo/car-info.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css'],
})
export class CarInfoComponent implements OnInit {
  carInfos: CarInfo[] = [];

  constructor(
   private carInfoService:CarInfoService
  ) {}
  ngOnInit(): void {
    this.getCarInfos();
  }
  getCarInfos(){
    this.carInfoService.getCarDetails().subscribe(response=>{
      this.carInfos = response.data;
    })
  }
  getCarInfosByBrandId(brandId:number){
    this.carInfoService.getCarDetailsByBrandId(brandId).subscribe(response=>{
      this.carInfos=response.data;
    })
  }
  getCarInfosByColorId(colorId:number){
    this.carInfoService.getCarDetailsByColorId(colorId).subscribe(response=>{
      this.carInfos=response.data;
    })
  }
  
}
