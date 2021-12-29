import { Pipe, PipeTransform } from '@angular/core';
import { CarInfo } from '../models/carInfo/carInfo';

@Pipe({
  name: 'filterTextPipe',
})
export class FilterTextPipe implements PipeTransform {
  transform(value: CarInfo[], searchText: string): CarInfo[] {

    searchText = searchText.toLocaleLowerCase();
    let result:CarInfo[]=[];

    let brandArray = value.filter((carInfo) => carInfo.brandName.toLocaleLowerCase().indexOf(searchText) !== -1);
    result.push.apply(result,brandArray);
    let colorArray = value.filter((carInfo)=>carInfo.colorName.toLocaleLowerCase().indexOf(searchText) !==-1);
    result.push.apply(result,colorArray);
    let nameArray = value.filter((carInfo)=>carInfo.name.toLocaleLowerCase().indexOf(searchText) !==-1);
    result.push.apply(result,nameArray);

    return searchText? result:value

  }
}
// let colorExist= carInfo.colorName.toLocaleLowerCase().indexOf(searchText) !==-1;
// let nameExist= carInfo.name.toLocaleLowerCase().indexOf(searchText) !==-1;
