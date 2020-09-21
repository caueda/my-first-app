import { RecipeService } from './recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {

  recipeSelected: Recipe;
  subscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      console.log('I was notified.');
      this.recipeSelected = recipe;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
