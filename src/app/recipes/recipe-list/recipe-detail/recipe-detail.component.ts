import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeSelected: Recipe;
  index: number;

  constructor(private recipeService: RecipeService, 
             private activatedRoute: ActivatedRoute,
             private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.index = +param['id'];
      this.recipeSelected = this.recipeService.getRecipe(this.index);
      console.log('recipeSelected', this.recipeSelected);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeSelected.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
