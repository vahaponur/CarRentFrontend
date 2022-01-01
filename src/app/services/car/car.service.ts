import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { CarInfo } from 'src/app/models/carInfo/carInfo';

import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44349/api/cars/';

  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(id: number): Observable<DataResponseModel<Car>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }
  getCarDetails(): Observable<ListResponseModel<CarInfo>> {
    let newPath = this.apiUrl + 'getcardetails';
    return this.httpClient.get<ListResponseModel<CarInfo>>(newPath);
  }
  
}
