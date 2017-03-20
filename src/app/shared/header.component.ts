import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, style } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    selector: 'my-header',
    template: `
       
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
        
                    <ul class="nav navbar-nav">
        
                        <li><a [routerLink]="['signup']">Sign Up</a></li>
                        <li><a [routerLink]="['signin']">Sign In</a></li>
                        <li><a [routerLink]="['protected']">Protected</a></li>
        
                    </ul>
                    <ul class="nav navbar-nav navbar-right" *ngIf="isAuth()">
        
                        <li><a (click)="onLogout()" style="cursor: pointer;">Logout</a></li>
                    </ul>
                </div><!-- /.container-fluid -->
        
            </nav>
        
        </header>
    `
})
export class HeaderComponent implements OnDestroy{
    private subscription = new Subscription();
    isAuthenticated = false;

    constructor(private authService: AuthService) {
        this.subscription = this.authService.isSigned().subscribe(
            (userState) => this.isAuthenticated = userState
        );
    }

    isAuth() {
        return this.isAuthenticated;
    }

    onLogout() {
        this.authService.logoutUser();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
