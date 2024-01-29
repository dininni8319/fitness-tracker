import { 
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
 } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[appIsDesktop]'
})
export class IsDesktopDirective implements OnInit {

  constructor(
    private deviceService: DeviceDetectorService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.checkDevice(); 
  }

  // add and remove the element from the DOM
  checkDevice() {
    if (this.deviceService.isDesktop()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }  else {
      this.viewContainer.clear();
    }
  }

}
