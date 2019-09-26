import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    private authService:AuthService,
    private router:Router,
    private alertifyService:AlertifyService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(!this.authService.loggedIn){
        this.router.navigateByUrl('/login');
        this.alertifyService.error("Sisteme giriş yapınız!")
        return false;
      }else{
        return true;
      }
  }
}
