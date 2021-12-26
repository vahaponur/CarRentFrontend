import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carImage/carImage';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl='https://localhost:44349/api/photos/';
  
  constructor(private httpClient:HttpClient) { }
  getPhotos():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getPhotosByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'getbycarid?carId='+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
