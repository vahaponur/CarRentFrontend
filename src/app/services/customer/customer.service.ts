import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from 'src/app/models/customer/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44349/api/customers/getall';
  individualUrl = 'https://localhost:44349/api/users/getbyid?id='
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
  getCustomerById(id:number):Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.individualUrl+id.toString()); 
  }
}
