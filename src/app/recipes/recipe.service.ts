import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
      private recipes: Recipe[] = [
        new Recipe(
          1,
          'A Test1 Recipe', 'This is simply a test1', 
          'http://loremflickr.com/150/150?random=1', 
          [new Ingredient('Flour', 5)]),
        new Recipe(
          2,
          'A Test2 Recipe', 'This is simply a test2',
          'http://loremflickr.com/150/150?random=2',
          [ new Ingredient('Bread',3), new Ingredient('Carrot', 2)])
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
        // ingredients.forEach(i => this.shoppingListService.addIngredient(i));
        this.shoppingListService.addIngredients(ingredients);
      }

      getRecipe(id: number) {
        const recipe = this.recipes.find((r) => {
          return r.id === id;
        });
        return recipe;
      }
}