import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';
import { RouterExtensionService } from 'src/app/services/routerService';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carForm: FormGroup;
  brands:Brand[];
  colors:Color[];
  dataLoaded=false;
  constructor(private formBuilder: FormBuilder,
    private carService:CarService,
    private toastr:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private router:RouterExtensionService) {}

  ngOnInit(): void {
    this.createForm();
    this.getVariables();
  }
  createForm() {
    this.carForm = this.formBuilder.group({
      brandId: ["",Validators.required],
      colorId: ["",Validators.required],
      modelYear: ["",Validators.required],
      dailyPrice: ["",Validators.required],
      description: ["",Validators.required],
      name: ["",Validators.required]
    });
  }
  getVariables(){
    this.brandService.getBrands().subscribe(res=>{
      this.brands=res.data;
      this.colorService.getColors().subscribe(colors=>{
        this.colors=colors.data;
        this.dataLoaded=true;
      })
    })
  }
  addCar(){
    if (this.carForm.valid) {
      let carModel = Object.assign({},this.carForm.value);
      this.carService.addCar(carModel).subscribe(res=>{
        if (res.success) {
          this.toastr.success('Car added')
          this.router.navigateWithReload('/');
        }
      },responseError=>{
        if (responseError.error) {
          console.log(responseError.error)
        }
        if (responseError.error.Errors) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            let item = responseError.error.Errors[i].ErrorMessage;
            this.toastr.error(item);
            
          }
        }
      })
    }
  }
}
