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
    let expiration = localStorage.getItem("tokenExpiration");
    let token = localStorage.getItem("token");
    let expDate = new Date(Date.parse(expiration||'{}'));

    if (token && expiration) { 
      if (new Date().valueOf()-expDate.valueOf()<0) {
        return true;
      }else{
        localStorage.removeItem("token")
        localStorage.removeItem("tokenExpiration")
        return false
      } 
    }
    return false;
  }
}
