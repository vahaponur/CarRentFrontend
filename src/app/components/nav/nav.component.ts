import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserSingleton } from 'src/app/models/userConst';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterExtensionService } from 'src/app/services/routerService';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged:boolean
  user:User;
  dataLoaded:boolean =false;
  constructor(private authService:AuthService,private routerExtension:RouterExtensionService) {}

  ngOnInit(): void {
    this.isLoggedIn()
  }
  isLoggedIn(){
    let user =localStorage.getItem("user")
    if (user) {
      this.isLogged = this.authService.isAuthenticated() ? true:false;
      this.user = JSON.parse(user)
      
    }
    this.dataLoaded = true;
  }
  logOut(){
    if (localStorage.getItem("token")&&localStorage.getItem("tokenExpiration")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiration")
      this.routerExtension.navigateWithReload("/")
    }
  }
}
