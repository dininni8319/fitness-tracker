import {
   Component, 
   EventEmitter, 
   OnInit, 
   Output,
   OnDestroy
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isDesktop = false;
  isAuth$: Observable<boolean> | undefined;
  authSubscripion!: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>()

  constructor(
    private deviceService: DeviceDetectorService,
    private authService: AuthService,
    private store: Store<{ui: fromRoot.State}>
  ) {
    this.checkDevice();
  };

  ngOnInit() {
        
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authService.authChange.subscribe(authStatus => {
    //   this.isAtuh = authStatus;
    // });
    
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  checkDevice() {
    this.isDesktop = this.deviceService.isDesktop();
  }

  onLogout() {
    this.authService.logout();
  }

  // ngOnDestroy(): void {
  //   this.authSubscripion.unsubscribe();  // clears up unneeded memory
  // }
}
