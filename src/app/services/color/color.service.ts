import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from 'src/app/models/color/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl='https://localhost:44349/api/colors/getall';
  individualUrl = 'https://localhost:44349/api/colors/getbyid?id='
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorResponseModel>{
    return this.httpClient.get<ColorResponseModel>(this.apiUrl);
  }
  getColorById(id:number):Observable<ColorResponseModel>{
    return this.httpClient.get<ColorResponseModel>(this.individualUrl+id.toString()); 
  }
}
