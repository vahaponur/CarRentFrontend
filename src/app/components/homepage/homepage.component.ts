import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvaliableCarsSingleton } from 'src/app/models/avaliableCarsSingleton';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { LocalStorageService } from 'src/app/services/localStorage/localStorageService';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  dateForm:FormGroup;
  constructor(private carService:CarService,private localStorageService:LocalStorageService<Car>,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.dateForm=this.formBuilder.group({
      rentDate:['',Validators.required],
      returnDate:['',Validators.required]
    });
  }
  getCars(){
    if (this.dateForm.valid) {
      let rentDate = new Date(this.dateForm.controls['rentDate'].value).toJSON();
      let returnDate =new Date(this.dateForm.controls['returnDate'].value).toJSON();
      this.carService.getAvaliableCarsByDateInterval(rentDate,returnDate).subscribe(res=>{
        if (res.success) {
          this.localStorageService.setArray<Car>("avaliableCars",res.data);
          this.router.navigateByUrl('/avaliableCars');
        }
      })
    }
  }

}
