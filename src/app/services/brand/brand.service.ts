import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel, IndvBrandResponseModel } from 'src/app/models/brand/brandResponseModel';

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
  getBrandById(id: number): Observable<IndvBrandResponseModel> {
    return this.httpClient.get<IndvBrandResponseModel>(
      this.individualUrl + id.toString()
    );
  }
}
