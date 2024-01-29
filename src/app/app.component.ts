import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  openedSideNav = false;
  isMobile = false
  
  toggle() {

  };

  constructor(
    private deviceService: DeviceDetectorService
  ) {
    this.checkDevice();
  };

  checkDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

}
