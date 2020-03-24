import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, 
    action: AuthActions.AuthActions) {

    switch(action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: user
            };
        case AuthActions.LOGOUT:
            return {
                ...state, // important to copy the state before overriding it
                user: null
            };
        // important to initialize the state, because 
        // at the startup ngrx sends initial actions to reducers
        default: 
            return state;
    }
    
}