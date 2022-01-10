import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  defaultColor: Color = { id: 0, name: '' };
  currentColor: Color = this.defaultColor;
  dataLoaded = false;
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;

  }
  getCurrentColorClass(color: Color) {
    
    if (this.currentColor == color) {
      return "table-primary";
    }
    return "";
  }
  clearCurrentColor(){
    this.currentColor =  this.defaultColor;
  }
  getDefaultColorClass(){
    if (this.currentColor == this.defaultColor) {
      return "";
    }
    return ""
  }
}
