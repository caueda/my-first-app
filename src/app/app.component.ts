import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  page = 'recipe';
  recipeSubscription: Subscription;
  constructor(private recipeService: RecipeService, private authService: AuthService){}

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.fetchData().subscribe();
    this.authService.autoLogin();
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
