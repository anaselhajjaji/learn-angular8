import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective; // Will look at the first occurence of PlaceHolderDirective
    private closeSub: Subscription;

    constructor(private authService: AuthService, 
        private router: Router, 
        private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) { // Extra verification, done in page but it can be manually bypassed using developer tools.
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authOb: Observable<AuthResponseData>;
        this.isLoading = true;

        if (this.isLoginMode) {
            authOb = this.authService.login(email, password);
        } else {
            authOb = this.authService.signup(email, password);
        }

        authOb.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMsg => {
            console.log(errorMsg);
            this.error = errorMsg;
            this.showErrorAlert(errorMsg);
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    // Create component dynamically
    // https://angular.io/guide/dynamic-component-loader
    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        
        // Clear if there is something inside the container
        hostViewContainerRef.clear();

        // Render
        const alertComponentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        alertComponentRef.instance.message = message;
        this.closeSub = alertComponentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}