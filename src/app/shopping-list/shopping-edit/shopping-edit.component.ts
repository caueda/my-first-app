import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('name', {static: false}) nameRef: ElementRef;
  @ViewChild('amount', {static: false}) amountRef: ElementRef;
  @Output() ingredientAddedEvent = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  addIngredient() {
    console.log('button ingredient pressed');
    const ingredient = new Ingredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value);
    this.ingredientAddedEvent.emit(ingredient);
  }
}
