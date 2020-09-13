import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() itemClicked = new EventEmitter();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.authService.authStatus$;
  }

  onLogoutClicked() {
    this.authService.logout();
    this.itemClicked.emit();
  }
}
