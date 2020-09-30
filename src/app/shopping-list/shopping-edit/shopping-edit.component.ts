import { ShoppingListService } from './../shopping-list.service';
import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  form: FormControl;
  ingredient: Ingredient = new Ingredient();

  ngOnInit() {
  }

  addIngredient(form: NgForm) {
    console.log('button ingredient pressed');
    console.log(form);
    this.shoppingListService.addIngredient(this.ingredient);
  }
}
