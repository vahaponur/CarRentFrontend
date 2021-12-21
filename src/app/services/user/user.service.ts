import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseModel } from 'src/app/models/user/userResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl='https://localhost:44349/api/users/getall';
  constructor(private httpClient:HttpClient) { }
  getUsers():Observable<UserResponseModel>{
      return this.httpClient.get<UserResponseModel>(this.apiUrl);
  }
 
}
