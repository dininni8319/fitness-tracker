import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IsMobileDirective } from './is-mobile.directive';

@Component({
  template: `
    <div *appIsMobile>Mobile Content</div>
    <div>Regular Content</div>
  `
})
class TestComponent {}

describe('IsMobileDirective', () => {
  let directive: IsMobileDirective;
  let deviceService: DeviceDetectorService;
  let templateRef: TemplateRef<any>;
  let viewContainer: ViewContainerRef;

  beforeEach(() => {
    class TestComponent {
      templateRef: TemplateRef<any>;

      constructor() {
        this.templateRef = {} as TemplateRef<any>; // Initialize templateRef property with an empty template reference
      }
    }
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add the element to the DOM if the device is mobile', () => {
    spyOn(deviceService, 'isMobile').and.returnValue(true);
    spyOn(viewContainer, 'createEmbeddedView');

    directive.checkDevice();

    expect(viewContainer.createEmbeddedView).toHaveBeenCalledWith(templateRef);
  });

  it('should remove the element from the DOM if the device is not mobile', () => {
    spyOn(deviceService, 'isMobile').and.returnValue(false);
    spyOn(viewContainer, 'clear');

    directive.checkDevice();

    expect(viewContainer.clear).toHaveBeenCalled();
  });
});