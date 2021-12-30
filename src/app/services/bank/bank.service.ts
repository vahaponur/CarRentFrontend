import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard';
import { PostModel } from 'src/app/models/postModel/postModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  apiUrl='https://localhost:44349/api/banks/';
  constructor(private httpClient:HttpClient) { }
  makePayment(creditCard:CreditCard):Observable<PostModel>{
    let newPath = this.apiUrl +"pay"
    return this.httpClient.post<PostModel>(newPath,creditCard);
  }
}
