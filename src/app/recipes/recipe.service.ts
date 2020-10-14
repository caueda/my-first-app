import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {

      API_V1_RECIPE = 'http://localhost:8080/api/v1/recipes';

      recipeListChanged = new Subject<Recipe[]>();
      public recipes: Recipe[] = [];
      recipeSelected = new Subject<Recipe>();

      constructor(private shoppingListService: ShoppingListService,
                  private http: HttpClient){}

      fetchData() {
        return this.http.get<Recipe[]>(this.API_V1_RECIPE)
        .pipe(
          tap((recipes) => {
            this.recipes = recipes;
            this.recipeListChanged.next(this.getRecipes());
          })
        );
      }

      getRecipes() {
          return this.recipes;
      }

      onSelect(recipe: Recipe) {
          this.recipeSelected.next(recipe);
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

      getRecipe(index: number) {
        if(this.recipes && this.recipes.length > 0)
          return this.recipes[index];
        else
          return new Recipe();
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.http.post(this.API_V1_RECIPE, recipe, {observe: 'response'})
        .subscribe((res) => {
          // console.log(res.headers.get('Location'));
          console.log(res);
        });
        this.recipeListChanged.next(this.getRecipes());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        const updateRecipe = this.getRecipe(index);
        updateRecipe.id = newRecipe.id;
        updateRecipe.description = newRecipe.description;
        updateRecipe.imagePath = newRecipe.imagePath;
        updateRecipe.name = newRecipe.name;
        updateRecipe.ingredients = newRecipe.ingredients;
        console.log(updateRecipe);
        console.log(newRecipe);
        this.http.put(this.API_V1_RECIPE, newRecipe, { observe: 'response'})
        .subscribe((res) => {
          console.log(res);
        });
        this.recipeListChanged.next(this.getRecipes());
      }

      deleteRecipe(index: number) {
        this.http.delete(this.API_V1_RECIPE + '/' + this.recipes[index].id, { observe: 'response'})
          .subscribe((res) => {
            console.log(res);
          });
        this.recipes.splice(index, 1);
        this.recipeListChanged.next(this.getRecipes());
      }

      storeRecipes(recipes: Recipe[]) {

      }
}