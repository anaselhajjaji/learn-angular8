import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? /* ? means optional */ : boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd6SWz0RLGkD9czbrZgb911gySoghhlDw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMsg = 'An unknown error occured.';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMsg);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMsg = "This email exists already.";
            }
            return throwError(errorMsg);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd6SWz0RLGkD9czbrZgb911gySoghhlDw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );


        

    }
}