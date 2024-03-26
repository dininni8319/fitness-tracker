import { Injectable } from "@angular/core";
import { 
  CanActivate,
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,  
  CanLoad,
  Route
} from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<{ui: fromRoot.State}>
  ) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.store.select(fromRoot.getIsAuth);
  }
  
  // for lazy loading
  canLoad(route: Route): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}