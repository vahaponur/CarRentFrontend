import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';

import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44349/api/customers/';

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl +"getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerById(id:number):Observable<DataResponseModel<Customer>>{
    let newPath = this.apiUrl+"getbyid?id="+id;
    return this.httpClient.get<DataResponseModel<Customer>>(newPath); 
  }
}
