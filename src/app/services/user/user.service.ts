import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { User } from 'src/app/models/user/user';

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
  getUserById(id:number):Observable<ResponseModel<User>>{
    let newPath = this.apiUrl + 'getbyid?id='+id;
    return this.httpClient.get<ResponseModel<User>>(newPath); 
  }
 
}
