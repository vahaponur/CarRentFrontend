import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';

import { ListResponseModel } from 'src/app/models/responseModels/listResponseModel';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl='https://localhost:44349/api/colors/';
  
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  getColorById(id:number):Observable<DataResponseModel<Color>>{
    let newPath = this.apiUrl + 'getbyid?id=' + id;

    return this.httpClient.get<DataResponseModel<Color>>(newPath); 
  }
}
