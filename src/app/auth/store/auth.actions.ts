import { Action } from '@ngrx/store';

// Actions formatted into recommended format: [Feature Name] DESC in English
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {
        email: string; 
        userId: string; 
        token: string; 
        expirationDate: Date;
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
