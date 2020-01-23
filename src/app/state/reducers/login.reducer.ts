import { createReducer, on } from '@ngrx/store';
import { login, logout, getStatus, getUserInfo } from '../actions/login.actions';

export const initialState = {};

const _loginReducer = createReducer(initialState,
  on(login, state => state),
  on(logout, state => initialState),
  on(getUserInfo, (state, {user}) => { 
    return {...state, user };}
 ),
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}