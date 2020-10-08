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
  id: number;

  constructor(private recipeService: RecipeService, 
             private activatedRoute: ActivatedRoute,
             private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipeSelected = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeSelected.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeSelected.id);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
