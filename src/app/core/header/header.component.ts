import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthorizacionService } from "../../shared/services/authorization_service"
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout, getStatus } from '../../state/actions/login.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  isAutenticated: boolean = false;
  // userInfo: string = '';
  userInfo$ = this.authorizationService.getUserInfo();
  // userInfo$.pipe(map(user) => user.email)
  login$: Observable<{}>;
  
  constructor(
    private store: Store<{login: Object}>,
    private authorizationService: AuthorizacionService,
    private router: Router) { 
      this.login$ = store.pipe(select('login'), map((user: any) => user.user));
      this.login$.subscribe((login) => console.log(login));
      // this.login$.subscribe((user) => { console.log(user)});
    }

  ngOnInit() {
    this.isAutenticated = this.authorizationService.isAuthenticated();
    // this.authorizationService.isLogged$.subscribe((isAutenticated) => this.isAutenticated = isAutenticated);
    // this.authorizationService.getUserInfo().subscribe((user) => {this.userInfo = user});
    // console.log(this.userInfo);
    // this.store.dispatch(getStatus());
  }

  ngOnChanges() {
    this.authorizationService.isLogged$.subscribe((isAutenticated) => this.isAutenticated = isAutenticated);
    // this.store.dispatch(getStatus());
  }

  Logout() {
    this.authorizationService.logOut();
    this.authorizationService.isLogged$.subscribe((isAutenticated) => this.isAutenticated = isAutenticated);
    // this.store.dispatch(logout());
    this.router.navigate(['login']);
    // window.location.reload();
  }

}
