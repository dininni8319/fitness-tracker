import { 
  Directive, 
  OnInit, 
  TemplateRef, 
  ViewContainerRef,
  Input
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[appIsMobile]'
})

export class IsMobileDirective implements OnInit {
  @Input() device = 'mobile';

  constructor(
    private deviceService: DeviceDetectorService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.checkDevice()
    console.log('device:\t',this.device);
    
  }

  // add and remove the element from the DOM
  checkDevice() {
    if (this.deviceService.isMobile()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }  else {
      this.viewContainer.clear();
    }

  }
}
