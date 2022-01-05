import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { UserRegister } from 'src/app/models/user/userRegister';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
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
    private router:Router
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
        this.toastrService.success('Kayıt Olunuyor...')
        localStorage.setItem("token",response.data.token)
        this.addCustomer(userToRegister.email,companyName);
        
      }
      else this.toastrService.error(response.message)
    },resError=>{
      
     
     if (resError.error.Errors.length > 0) {
      console.log(resError);
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
        //What happens after customer add
        this.router.navigateByUrl('/');
      })
    })
  }
}
