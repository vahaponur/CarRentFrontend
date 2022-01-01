import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand/brand';
import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44349/api/brands/';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  getBrandById(id: number): Observable<DataResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<DataResponseModel<Brand>>(newPath);
  }
  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+'add';
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
