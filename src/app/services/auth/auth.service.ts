import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { UserLogin } from 'src/app/models/user/userLogin';
import { UserRegister } from 'src/app/models/user/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl ='https://localhost:44349/api/auth/';
  constructor(private httpClient:HttpClient) { }

  register(userRegisterModel:UserRegister):Observable<DataResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<DataResponseModel<TokenModel>>(newPath,userRegisterModel);
  }
  login(userLogin:UserLogin):Observable<DataResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<DataResponseModel<TokenModel>>(newPath,userLogin);
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }
}
