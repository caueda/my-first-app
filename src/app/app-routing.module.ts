import { RecipeDetailComponent } from './recipes/recipe-list/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent,  pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent, children: [
        { path: ':id/detail', component: RecipeDetailComponent}
    ]},
    { path: 'shopping', component: ShoppingListComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}