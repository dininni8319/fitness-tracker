import { 
  Component,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})

export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>()
  isAuth$: Observable<boolean> | undefined;

  onClose() {
    this.sidenavClose.emit()
  }

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }
}
