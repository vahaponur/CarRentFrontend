import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarImageService } from 'src/app/services/carImage/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
  currentCarImage:CarImage[]=[]
  bilgi:Params;
  constructor(private carImgeService:CarImageService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      this.bilgi=res;
      if (res["carId"]) {
        this.getByCarId(res["carId"]);
      }
    })
    console.log(this.activatedRoute.toString());
  }
getByCarId(carId:number){
  this.carImgeService.getPhotosByCarId(carId).subscribe(res=>{
    this.currentCarImage = res.data
  })
}
}
