import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserSingleton } from 'src/app/models/userConst';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/localStorage/tokenService';
import { RouterExtensionService } from 'src/app/services/routerService';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged:boolean
  user:User;
  dataLoaded:boolean =false;
  constructor(private userService:UserService,private tokenService:TokenService,private authService:AuthService,private routerExtension:RouterExtensionService) {}

  ngOnInit(): void {
    this.isLoggedIn()
  }
  isLoggedIn(){
    let userReaded = this.userService.getSessionUser()
    if (userReaded!==undefined) {
      
      this.user = userReaded;
      this.isLogged=true;
    }

    this.dataLoaded = true;
  }
  logOut(){
    if (this.tokenService.TokenExist()) {
      this.userService.deleteSessionUser()
      this.tokenService.RemoveToken()
      this.routerExtension.navigateWithReload("/")
    }
  }
}
