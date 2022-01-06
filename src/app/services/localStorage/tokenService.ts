import { Injectable } from '@angular/core';
import { TokenModel } from 'src/app/models/tokenModel';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public  AddTokenLocal(token:TokenModel){
    localStorage.setItem("token",token.token);
    localStorage.setItem("tokenExpiration",token.expiration);
  }
  public  RemoveToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }
  public  UpdateTokenLocal(token:TokenModel){
    this.AddTokenLocal(token);
  }
  public  GetToken():string{
    return localStorage.getItem("tokenExpiration") || 'Token doesn\'t exist'
  }
  public  GetTokenExpiration():string{
    if (this.TokenExist()) {
      
      return localStorage.getItem("tokenExpiration") || ''
    }
    return "Token doesn't exist"
  }
  public  TokenExist():boolean{
    let expiration = localStorage.getItem("tokenExpiration") ;
    let token = localStorage.getItem("token");
    if (expiration&&token) {
      return true;
    }
    return false;
  }
  public  TokenValid():boolean{
  
    let expDate = new Date(Date.parse(this.GetTokenExpiration()||'{}'));

    if (this.TokenExist()) { 
      if (new Date().valueOf()-expDate.valueOf() < 0) {
        return true;
      }else{
        this.RemoveToken()
        return false
      } 
    }
    return false;
  }
}
