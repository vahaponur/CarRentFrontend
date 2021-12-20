import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brand/brandResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44349/api/brands/getall';
  individualUrl = 'https://localhost:44349/api/brands/getbyid?id=';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.apiUrl);
  }
  getBrandById(id: number): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(
      this.individualUrl + id.toString()
    );
  }
}
