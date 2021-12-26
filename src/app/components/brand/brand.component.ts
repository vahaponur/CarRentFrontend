import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  defaultBrand:Brand = {id:0,name:""};
  currentBrand:Brand = this.defaultBrand
  dataLoaded = false;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }
  clearCurrentBrand(){
    this.currentBrand = this.defaultBrand;
  }
  getCurrentBrandClass(brand:Brand){
    if (brand==this.currentBrand) {
      return "table-primary";
    }
    else return ""
  }
  getDefaultBrandClass(){
    if (this.currentBrand == this.defaultBrand) {
      return "table-active";
    }
    return ""
  }
}
