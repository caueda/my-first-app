import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe = new Recipe();

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = (params['id'] != null);
      this.initForm();
    });
  }

  private initForm() {
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id);
    }

    if(this.recipe['ingredients']) {
      for(let ingredient of this.recipe.ingredients) {
        console.log(ingredient);
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, [Validators.required]),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(this.recipe.name, [Validators.required]),
      'imagePath' : new FormControl(this.recipe.imagePath, [Validators.required]),
      'description' : new FormControl(this.recipe.description),
      'ingredients' : recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {

    const newRecipe = new Recipe();
    newRecipe.name = this.recipeForm.value.name;
    newRecipe.description = this.recipeForm.value.description;
    newRecipe.imagePath = this.recipeForm.value.imagePath;
    newRecipe.ingredients = this.recipeForm.value.ingredients;

    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
