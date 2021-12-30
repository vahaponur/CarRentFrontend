import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { PostModel } from 'src/app/models/postModel/postModel';
import { Singleton } from 'src/app/models/rentConst';
import { BankService } from 'src/app/services/bank/bank.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  result:PostModel;
  card:CreditCard ={
    number:0,
    ownerName:''
  };
  paymentMade:boolean = false;
  constructor(private bankService:BankService,private rentService:RentalService) { }

  ngOnInit(): void {
  }

  makePayment(creditCart:CreditCard){
    this.bankService.makePayment(creditCart).subscribe(
      response=>{

        this.result = response;
        this.rentService.addRental(Singleton.RENT).subscribe(rent=>{
          this.paymentMade = true;
          
        })

      }
    )
  }

}
