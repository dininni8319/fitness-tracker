import { Injectable } from "@angular/core";
import { 
  CanActivate,
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router, 
  CanLoad,
  Route
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuth()) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  // for lazy loading
  canLoad(route: Route): boolean {
    if (this.authService.isAuth()) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}