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
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ui: fromRoot.State}>
  ) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.store.select(fromRoot.getIsAuth);
   
    // if (this.authService.isAuth()) {
    //   return true
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
  
  // for lazy loading
  canLoad(route: Route): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth);
    // if (this.authService.isAuth()) {
    //   return true
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}