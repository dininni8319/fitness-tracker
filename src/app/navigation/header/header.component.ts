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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isDesktop = false;
  isAtuh = false;
  authSubscripion!: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>()

  constructor(
    private deviceService: DeviceDetectorService,
    private authService: AuthService
  ) {
    this.checkDevice();
  };

  ngOnInit() {
    this.authService.authChange.subscribe(authStatus => {
      this.isAtuh = authStatus;
    });
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

  ngOnDestroy(): void {
    this.authSubscripion.unsubscribe();  // clears up unneeded memory
  }
}
