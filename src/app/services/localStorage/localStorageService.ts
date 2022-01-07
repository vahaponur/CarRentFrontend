import { Injectable } from '@angular/core';
import { TokenModel } from 'src/app/models/tokenModel';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {

    setItem<T>(name:string,object:T){
        let jsoned = JSON.stringify(object);
        localStorage.setItem(name,jsoned);
    }
    setArray<T>(arrayName:string,object:T[]){
        let jsoned = JSON.stringify(object);
        localStorage.setItem(arrayName,jsoned);
    }
    getItem<T>(name:string):T{
        let item = localStorage.getItem(name);
        if (item) {
            let parsedItem:T=JSON.parse(item);
            return parsedItem;
        }
        return undefined
    }
    getItemsFromArray<T>(arrayName:string):T[]{
        let item = localStorage.getItem(arrayName);
        if (item) {
            let parsed:T[]=JSON.parse(item);
            return parsed;
        }
        return undefined;
    }
}