import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoading = false;
    error: string = null;
    userSubscription: Subscription;
    user: User;

    constructor(private authService: AuthService,
                private recipeService: RecipeService,
                private router: Router){}

    ngOnInit(){
        this.userSubscription = this.authService.userSubject.subscribe(user => this.user = user);
    }

    onSubmit(authForm: NgForm) {
        const username: string = authForm.value.email;
        const password: string = authForm.value.password;
        this.isLoading = true;
        this.authService.login(username, password).subscribe(
            (response) => {
                this.isLoading = false;
                this.error = null;
                this.router.navigate(['/recipes']);
            },
            (error) => {
                this.error = error;
                this.isLoading = false;
            }
        );
        authForm.reset();
    }

    ngOnDestroy(): void {
        if(!this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}