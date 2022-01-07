import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvaliableCarsSingleton } from 'src/app/models/avaliableCarsSingleton';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  dateForm:FormGroup;
  constructor(private carService:CarService,private formBuilder:FormBuilder,private router:Router) { }

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
          AvaliableCarsSingleton.AVALIABLECARS=res.data;
          this.router.navigateByUrl('/avaliableCars');
        }
      })
    }
  }

}
