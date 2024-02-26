import { 
  Component,
  Output,
  OnDestroy,
  OnInit,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})

export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>()
  isAuth = false;
  authSubscription!: Subscription

  onClose() {
    this.sidenavClose.emit()
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
      
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();  // clears up unneeded memory when component is destroyed
  }
}
