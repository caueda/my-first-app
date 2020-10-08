import { RecipeService } from './../recipe.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeListSubscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
            private router: Router,
            private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeListSubscription = this.recipeService.recipeListChanged.subscribe(
      (recipes) => this.recipes = recipes
    );
  }

  ngOnDestroy() {
    this.recipeListSubscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.activateRoute});
  }
}
