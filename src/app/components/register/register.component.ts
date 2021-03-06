import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserRegister } from 'src/app/models/user/userRegister';
import { UserSingleton } from 'src/app/models/userConst';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { TokenService } from 'src/app/services/localStorage/tokenService';
import { RouterExtensionService } from 'src/app/services/routerService';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private customerService:CustomerService,
    private router:Router,
    private routerExtension:RouterExtensionService,
    private tokenService:TokenService
  ) {}

  ngOnInit(): void { this.createForm()}
  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      companyName: [''],
    });
  }
  registerOperation() {
    if (this.registerForm.valid) {
      let userToRegister: UserRegister = {
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
      };
      let companyName = this.registerForm.controls['companyName'].value
      this.registerUser(userToRegister,companyName);
    }
  }
  registerUser(userToRegister: UserRegister,companyName:string) {
    this.authService.register(userToRegister).subscribe((response) => {
      if (response.success) {
        this.toastrService.success('Kay??t Olunuyor...')
        this.tokenService.AddTokenLocal(response.data)
        this.addCustomer(userToRegister.email,companyName);
        
      }
      else this.toastrService.error(response.message)
    },resError=>{
     if (resError.error.Errors.length > 0) {
      
      for (let index = 0; index < resError.error.Errors.length; index++) {
        this.toastrService.error(resError.error.Errors[index].ErrorMessage); 
       }
     }
     else this.toastrService.error(resError.error)
    
    });
  }
  addCustomer(userEmail:string,customerName:string){
    this.userService.getByEmail(userEmail).subscribe(res=>{
     
      let customer:any= {
        companyName:customerName,
        userId:res.data.id
      }
      this.customerService.addCustomer(customer).subscribe(response=>{
        if (response.success) {
          let userObject = {
            id:res.data.id,
            firstName:res.data.firstName,
            lastName:res.data.lastName,
            email:res.data.email,
            status:res.data.status
          }
          localStorage.setItem("user",JSON.stringify(userObject));
          if (localStorage.getItem("user")) {
          this.routerExtension.navigateWithReload("/");
            
          }
        }
      })
    })
  }
  
  
}
