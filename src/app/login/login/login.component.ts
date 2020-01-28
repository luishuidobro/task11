import { Component, OnInit } from '@angular/core';
import { AuthorizacionService } from "../../shared/services/authorization_service"
import { User } from '../../shared/models/user-model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../../state/actions/login.actions';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email = "";
  public password = "";
  login$: Observable<Object>;

  constructor(
    private store: Store<{login: Object}>,
    private authorizationService: AuthorizacionService) {
      this.login$ = store.pipe(select('login'));
    }

  ngOnInit() {
  }

  Login() {
    const user = {
      email: this.email,
      password: this.password
    } as User;
    // this.authorizationService.login(user);
    this.store.dispatch(login({user}));
  }
}
