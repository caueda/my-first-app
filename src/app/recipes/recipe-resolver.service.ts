import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.recipeService.getRecipes().length === 0) {
            return this.recipeService.fetchData();
        } else {
            return this.recipeService.getRecipes();
        }
    }

}