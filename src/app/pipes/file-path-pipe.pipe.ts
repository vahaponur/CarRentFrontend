import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filePathPipe'
})
export class FilePathPipePipe implements PipeTransform {

  transform(value: string, searchWord:string,defPath:string=''): string {
    let indexOfWord = value.search(searchWord);
    if (indexOfWord!==-1) {
     value = value.replace('\\','/')
      return '.\\'+value.substring(indexOfWord);
    }
    if (value ==='') {
      return '.\assets\car_images\def.jpg'
    }
    return ''
  }

}
