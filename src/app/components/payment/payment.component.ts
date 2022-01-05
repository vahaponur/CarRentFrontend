import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentSingleton } from 'src/app/models/rentConst';
import { BankService } from 'src/app/services/bank/bank.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  creditCardForm: FormGroup;
  constructor(
    private bankService: BankService,
    private rentService: RentalService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.createCardForm();
  }

  createCardForm(){
    this.creditCardForm = this.formBuilder.group({
      number:[0,Validators.required],
      ownerName:['',Validators.required],
    })
  }
  addRent(){
    this.rentService.addRental(RentSingleton.RENT).subscribe(res=>{
      this.toastr.success(res.message.replace('Öğe','Araç'));
   
    });
  }
  getPayment(){
    if (this.creditCardForm.valid) {
      let card = Object.assign({},this.creditCardForm.value);
      this.rentService.addRental(RentSingleton.RENT).subscribe(res=>{
        if (res.success) {
          this.bankService.makePayment(card).subscribe(res2=>{
            if (res2.success) {
              this.toastr.success(res2.message)
            }
            else  this.toastr.error(res2.message);
          });
          this.toastr.success("Successfully Rented");
        }
        else{
          this.toastr.error(res.message);
        }
      },resError=>{
          console.log(resError);
          
      })
    }
  }

}
