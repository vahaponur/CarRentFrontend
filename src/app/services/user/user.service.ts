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
 setUserSession(user:User){
   if (!user) {
     return false;
   }
  let userObject = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
  };
  localStorage.setItem('user', JSON.stringify(userObject));
  return true;
 }
 getSessionUser():(User|undefined){
   let user=localStorage.getItem('user')

   if (user) {
     let sesUser:User=JSON.parse(user);
     return sesUser;
   }
   return undefined
 }
 deleteSessionUser(){
  localStorage.removeItem("user");
 }
 
}
