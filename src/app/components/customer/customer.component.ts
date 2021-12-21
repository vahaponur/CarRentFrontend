import { Component, OnInit } from '@angular/core';
import { CustomerInfo } from 'src/app/models/customerInfo/customerInfo';
import { User } from 'src/app/models/user/user';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: CustomerInfo[] = [];
  constructor(
    private userService: UserService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.setCustomerInfo();
  }

  setCustomerInfo() {
    this.customerService.getCustomers().subscribe((res) => {
      let users: User[];
      this.userService.getUsers().subscribe((userR) => {
        users = userR.data;
        res.data.forEach((element) => {
          let object: CustomerInfo;
          object = {
            companyName: '',
            firstName: '',
            lastName: '',
            userId: 1,
          };
          object.companyName = element.companyName;
          object.userId = element.userId;
          users.forEach((user) => {
            if (user.id === object.userId) {
              object.firstName = user.firstName;
              object.lastName = user.lastName;
            this.customers.push(object);

            }
          });
        });
      
      
      });
    });
  }
}
