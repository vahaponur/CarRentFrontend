import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/postModel/postModel';
import { Rental } from 'src/app/models/rental/rental';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
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
  getRentalById(id:number):Observable<ResponseModel<Rental>>{
    let newPath = this.apiUrl + 'getbyid?id='+id;
    return this.httpClient.get<ResponseModel<Rental>>(newPath); 
  }
  addRental(rental:Rental):Observable<PostModel>{
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<PostModel>(newPath,rental);
  }
  getRentalByCarId(carId:number):Observable<ResponseModel<Rental>>{
    let newPath = this.apiUrl + 'getbycarid?carId='+carId;
    return this.httpClient.get<ResponseModel<Rental>>(newPath);
  }
}
