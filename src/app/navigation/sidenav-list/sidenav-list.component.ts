import { 
  Component,
  Input, 
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})

export class SidenavListComponent {
  @Input() isMobile = false
  @Output() sidenavClose = new EventEmitter<void>()

  onToggleSidenav() {
    this.sidenavClose.emit()
  }
}
