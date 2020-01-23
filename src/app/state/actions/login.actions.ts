import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user-model';

// export const login = createAction('[Login Component] Login');
export const logout = createAction('[Login Component] Logout');
export const getStatus = createAction('[Login Component] GetStatus');

export const login = createAction('[Login Component] Login', props<{ user: User }>());
export const loginSuccess = createAction('[Login Component] LoginSuccess', props<{ token: Object }>());
export const loginFailure = createAction('[Login Component] LoginFailure', props<{ error: string }>());
export const getUserInfo = createAction('[Login Component] UserSuccess', props<{user: Object}>());