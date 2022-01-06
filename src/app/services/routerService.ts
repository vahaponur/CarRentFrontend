import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataResponseModel } from 'src/app/models/responseModels/dataResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { UserLogin } from 'src/app/models/user/userLogin';
import { UserRegister } from 'src/app/models/user/userRegister';

@Injectable({
  providedIn: 'root'
})
export class RouterExtensionService {
    /**
     *
     */
    constructor(private router:Router) {
    }

    navigateWithReload(url:string){
        this.router.navigateByUrl(url).then(()=>{window.location.reload();})
    }
}