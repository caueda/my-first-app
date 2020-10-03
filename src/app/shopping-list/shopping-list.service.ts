import { OnInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
    ingredientListChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<Ingredient>();

    private ingredients : Ingredient[] = [
        new Ingredient(0, 'Apples', 5),
        new Ingredient(1, 'Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        ingredient.id = this.ingredients.length;
        this.ingredientListChanged.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientListChanged.next(this.getIngredients());
    }

    getIngredient(id: number) {
        return this.ingredients.find(i => i.id === id);
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientListChanged.next(this.getIngredients());
    }

    onSelectIngredient(index: number) {
        this.ingredientSelected.next(this.getIngredient(index));
    }
}