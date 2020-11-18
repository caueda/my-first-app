import { Recipe } from './recipe.model';
import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable()
export class RecipeService {

      API_V1_RECIPE = 'http://localhost:8080/api/v1/recipes';

      recipeListChanged = new Subject<Recipe[]>();
      recipes: Recipe[] = [];
      recipeSelected = new Subject<Recipe>();

      constructor(private shoppingListService: ShoppingListService,
                  private http: HttpClient,
                  private authService: AuthService){}

      fetchData() {
        return this.authService.userSubject.pipe(
          //take(1),
          exhaustMap(user => {
            if(!user) return [];
            return this.http.get<Recipe[]>(this.API_V1_RECIPE);
          }),
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients :  []
              }
            });
          }),
          tap(recipes => {
              this.recipes = recipes;
              this.recipeListChanged.next(this.recipes.slice());
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