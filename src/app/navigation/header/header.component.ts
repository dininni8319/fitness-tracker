import {
   Component, 
   EventEmitter, 
   Output,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  isDesktop = false
  @Output() sidenavToggle = new EventEmitter<void>()

  constructor(
    private deviceService: DeviceDetectorService
  ) {
    this.checkDevice();
  };

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  checkDevice() {
    this.isDesktop = this.deviceService.isDesktop();
  }
}
