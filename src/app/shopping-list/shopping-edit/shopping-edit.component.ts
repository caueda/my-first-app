import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) form: NgForm;
  subscription: Subscription;
  ingredient: Ingredient = new Ingredient();
  editMode = false;

  constructor(private shoppingListService: ShoppingListService,) { }

  ngOnInit() {
    this.subscription =
      this.shoppingListService.ingredientSelected.subscribe((ingredient) => {
        this.editMode = true;
        this.ingredient = ingredient;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if(this.editMode) {
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(this.ingredient);
    }
    this.ingredient = new Ingredient();
  }

  onClear() {
    this.ingredient = new Ingredient();
    this.editMode = false;
  }

  onDelete(id: number) {
    this.shoppingListService.deleteIngredient(id);
    this.ingredient = new Ingredient();
    this.editMode = false;
  }
}
