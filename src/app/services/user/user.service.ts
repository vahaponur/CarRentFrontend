import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';
import { User } from 'src/app/models/user/user';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl='https://localhost:44349/api/users/';
  constructor(private httpClient:HttpClient) { }
  getUsers():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + 'getall';
      return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getUserById(id:number):Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl + 'getbyid?id='+id;
    return this.httpClient.get<DataResponseModel<User>>(newPath); 
  }
 getByEmail(email:string):Observable<DataResponseModel<User>>{
   let newPath = this.apiUrl + 'getbyemail?email='+email;
   return this.httpClient.get<DataResponseModel<User>>(newPath);
 }
 
}
