import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
      recipeListChanged = new Subject<Recipe[]>();
      private recipes: Recipe[] = [
        new Recipe(
          1,
          'A Test1 Recipe', 'This is simply a test1', 
          'http://loremflickr.com/150/150?random=1', 
          [new Ingredient(4, 'Flour', 5)]),
        new Recipe(
          2,
          'A Test2 Recipe', 'This is simply a test2',
          'http://loremflickr.com/150/150?random=2',
          [ new Ingredient(2, 'Bread',3), new Ingredient(3, 'Carrot', 2)])
      ];

      constructor(private shoppingListService: ShoppingListService){}

      recipeSelected = new Subject<Recipe>();

      getRecipes() {
          return this.recipes.slice();
      }

      onSelect(recipe: Recipe) {
          console.log('Notifying listeners');
          this.recipeSelected.next(recipe);
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

      getRecipe(id: number) {
        const recipe = this.recipes.find((r) => {
          return r.id === id;
        });
        return recipe;
      }

      addRecipe(recipe: Recipe) {
        recipe.id = this.getNextId();
        this.recipes.push(recipe);
        this.recipeListChanged.next(this.getRecipes());
      }

      updateRecipe(id: number, newRecipe: Recipe) {
        const updateRecipe = this.getRecipe(id);
        updateRecipe.description = newRecipe.description;
        updateRecipe.imagePath = newRecipe.imagePath;
        updateRecipe.name = newRecipe.name;
        updateRecipe.ingredients = newRecipe.ingredients;
        this.recipeListChanged.next(this.getRecipes());
      }

      deleteRecipe(id: number) {
        this.recipes.splice(id-1, 1);
        this.recipeListChanged.next(this.getRecipes());
      }

      getNextId() {
        return this.recipes.length + 1;
      }
}