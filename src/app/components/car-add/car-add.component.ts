import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private carService:CarService,
    private toastr:ToastrService) {}

  ngOnInit(): void {
    this.createForm();
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
  addCar(){
    if (this.carForm.valid) {
      let carModel = Object.assign({},this.carForm.value);
      this.carService.addCar(carModel).subscribe(res=>{
        if (res.success) {
          this.toastr.success('Car added')
        }
      },responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            let item = responseError.error.Errors[i].ErrorMessage;
            this.toastr.error(item);
            
          }
        }
      })
    }
  }
}
