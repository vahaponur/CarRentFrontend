import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { CarImageService } from 'src/app/services/carImage/car-image.service';
import { CarInfoService } from 'src/app/services/carInfo/car-info.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carInfo:CarInfo;
  carImages:CarImage[];
  constructor(
    private carImageService: CarImageService,
    private carInfoService: CarInfoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      if (res["carId"]) {
        this.getCarInfo(res["carId"]);
        this.getCarImage(res["carId"]);
      }
    })
  }
  getCarInfo(carId:number){
    this.carInfoService.getCarDetailsById(carId).subscribe(res=>{
      this.carInfo = res.data;
    });
  }
  getCarImage(carId:number){
    this.carImageService.getPhotosByCarId(carId).subscribe(res=>{
      this.carImages = res.data
    })
  }
}
