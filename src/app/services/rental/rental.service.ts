import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/postModel/postModel';
import { Rental } from 'src/app/models/rental/rental';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44349/api/rentals/';

  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalById(id:number):Observable<DataResponseModel<Rental>>{
    let newPath = this.apiUrl + 'getbyid?id='+id;
    return this.httpClient.get<DataResponseModel<Rental>>(newPath); 
  }
  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  getLastRentalByCarId(carId:number):Observable<DataResponseModel<Rental>>{
    let newPath = this.apiUrl + 'getlastbycarid?carId='+carId;
    return this.httpClient.get<DataResponseModel<Rental>>(newPath);
  }
}
