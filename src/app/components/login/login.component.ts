import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/app/models/user/userLogin';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/localStorage/tokenService';
import { RouterExtensionService } from 'src/app/services/routerService';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private routerExtension: RouterExtensionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  loginOperation() {
    if (this.loginForm.valid) {
      let userToLogin: UserLogin = Object.assign({}, this.loginForm.value);
      this.authService.login(userToLogin).subscribe(
        (res) => {
          if (res.success) {
            this.tokenService.AddTokenLocal(res.data);
            this.toastr.success('Giriş Yapılıyor...');
            this.getUser(userToLogin.email)
          } else this.toastr.error(res.message);
        },
        (responseError) => {
          let message = responseError.error.message;
          if (message) {
            this.toastr.error(message);
     
          }
          let erArr = responseError.error.Errors;
          if (erArr) {
            for (let index = 0; index < erArr.length; index++) {
              this.toastr.error(erArr[index].ErrorMessage);
            }
          }
        }
      );
    }
  }
  getUser(email: string) {
    this.userService.getByEmail(email).subscribe((res) => {
      if (res.success) {
        let userObject = {
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          status: res.data.status,
        };
        localStorage.setItem('user', JSON.stringify(userObject));
        if (localStorage.getItem('user')) {
          this.routerExtension.navigateWithReload('/');
        }
      }
    });
  }
}
