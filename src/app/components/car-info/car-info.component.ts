import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaliableCarsSingleton } from 'src/app/models/avaliableCarsSingleton';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { CarInfoService } from 'src/app/services/carInfo/car-info.service';
import { ColorService } from 'src/app/services/color/color.service';
import { LocalStorageService } from 'src/app/services/localStorage/localStorageService';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css'],
})
export class CarInfoComponent implements OnInit {
  carInfos: CarInfo[] = [];
  searchText:string='';
  colors:Color[];
  brands:Brand[];
  colorSearch:string='';
  brandSearch:string='';
  constructor(
   private carInfoService:CarInfoService,
   private activatedRoute:ActivatedRoute,
   private colorService:ColorService,
   private brandService:BrandService,
   private router:Router,
   private localStorageService:LocalStorageService<Car>
  ) {}
  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    if (this.router.url=='/avaliableCars') {
      this.carInfos.length = 0;
      let Cars:Car[]=this.localStorageService.getItemsFromArray<Car>("avaliableCars");
     
        Cars.forEach(element => {
        this.getCarInfoByWhole(element.id);
          
        });
      
    }
    else{
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
    }
   

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
  getCarInfoByWhole(carId:number){
    this.carInfoService.getCarDetailsById(carId).subscribe(response=>{

      this.carInfos.push(response.data)
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(res=>this.colors=res.data);
  }
  getBrands(){
    this.brandService.getBrands().subscribe(res=>this.brands=res.data);
  }
  filterByClick(filterText:string){
    this.searchText = filterText;
    console.log(this.searchText);
  }
}
