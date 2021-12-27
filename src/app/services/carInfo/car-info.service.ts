import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CarService } from '../car/car.service';

@Injectable({
  providedIn: 'root',
})
export class CarInfoService {
  apiUrl = 'https://localhost:44349/api/cars/';


  constructor(private httpClient:HttpClient) {}

 
  getCarDetails(): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiUrl + 'getcardetails';
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarDetailsByBrandId(brandId:number): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiUrl + 'getcardetailsbybrandid?brandId='+brandId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarDetailsByColorId(colorId:number): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiUrl + 'getcardetailsbycolorid?colorId='+colorId;
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  getCarDetailsById(carId:number):Observable<ResponseModel<CarInfo>>{
    let newPath = this.apiUrl+'getcardetailsbyid?carId=' +carId
    return this.httpClient.get<ResponseModel<CarInfo>>(newPath);
  }
}
