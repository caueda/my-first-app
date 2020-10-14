import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  page = 'recipe';
  recipeSubscription: Subscription;
  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.fetchData()
    .subscribe();
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
