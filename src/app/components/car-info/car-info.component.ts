import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
   private carInfoService:CarInfoService,
   private activatedRoute:ActivatedRoute,

  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      if (res["brandId"]) {
        this.getCarInfosByBrandId(res["brandId"]);
      }
      else if (res["colorId"]) {
        this.getCarInfosByColorId(res["colorId"]);
      }
      else if(res["carId"]){
        this.getCarInfoById(res["carId"]);
      }
      else{
        this.getCarInfos();
      }
    })
    console.log(this.activatedRoute.toString());
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
  getCarInfoById(carId:number){
    this.carInfoService.getCarDetailsById(carId).subscribe(response=>{
      this.carInfos.length=0;
      this.carInfos.push(response.data)
    })
  }
  
}
