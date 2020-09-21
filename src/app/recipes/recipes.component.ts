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

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
