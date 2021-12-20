import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModel } from 'src/app/models/car/carResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44349/api/cars/getall';
  individualUrl = 'https://localhost:44349/api/cars/getbyid?id=';

  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
  }

  getCarById(id: number): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(
      this.individualUrl + id.toString()
    );
  }
}
