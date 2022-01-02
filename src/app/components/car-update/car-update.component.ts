import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { CarInfoService } from 'src/app/services/carInfo/car-info.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carInfo: CarInfo;
  car: Car;
  brands: Brand[];
  colors: Color[];
  carInfoForm: FormGroup;
  dataUploaded: boolean = false;
  constructor(
    private carInfoService: CarInfoService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getVariables();
  }
  getVariables() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carId']) {
        this.carInfoService
          .getCarDetailsById(param['carId'])
          .subscribe((res) => {
            this.carInfo = res.data;
            console.log(this.carInfo);
            this.carService.getCarById(param['carId']).subscribe((carR) => {
              this.car = carR.data;
              this.dataUploaded = true;
              this.createForm();
            });
          });
      }
    });
    this.brandService.getBrands().subscribe((res) => {
      this.brands = res.data;
    });
    this.colorService.getColors().subscribe((res) => {
      this.colors = res.data;
    });
  }
  createForm() {
    this.carInfoForm = this.formBuilder.group({
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.carInfo.modelYear, Validators.required],
      dailyPrice: [this.carInfo.dailyPrice, Validators.required],
      description: [this.carInfo.description, Validators.required],
      name: [this.carInfo.name, Validators.required],
    });
  }

  debugSelect() {
    console.log(this.carInfoForm.controls['brandId'].value);
  }
  update() {
    if (this.carInfoForm.valid) {
      let carToSend:Car = Object.assign({}, this.carInfoForm.value);
      carToSend.id=this.car.id
      console.log(carToSend)
      this.carService.updateCar(carToSend).subscribe(
        (res) => {
          if (res.success) {
            this.toastrService.success(res.message);
          } else this.toastrService.error(res.message);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              let item = responseError.error.Errors[i].ErrorMessage;
              this.toastrService.error(item);
            }
          }
        }
      );
    }
  }
}
