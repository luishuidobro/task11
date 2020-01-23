import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthorizacionService } from "../../shared/services/authorization_service"
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout, getStatus } from '../../state/actions/login.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  isAutenticated: boolean = false;
  userInfo: string = '';
  userInfo$ = this.authorizationService.getUserInfo();
  login$: Observable<string>;
  
  constructor(
    private store: Store<{login: string}>,
    private authorizationService: AuthorizacionService,
    private router: Router) { 
      this.login$ = store.pipe(select('login'));
    }

  ngOnInit() {
    this.isAutenticated = this.authorizationService.isAuthenticated();
    this.authorizationService.isLogged$.subscribe((isAutenticated) => this.isAutenticated = isAutenticated);
    // this.authorizationService.getUserInfo().subscribe((user) => {this.userInfo = user});
    console.log(this.userInfo);
    this.store.dispatch(getStatus());
  }

  ngOnChanges() {
    this.authorizationService.isLogged$.subscribe((isAutenticated) => this.isAutenticated = isAutenticated);
    this.store.dispatch(getStatus());
  }

  Logout() {
    this.authorizationService.logOut();
    this.store.dispatch(logout());
    this.router.navigate(['login']);
    // window.location.reload();
  }

}
