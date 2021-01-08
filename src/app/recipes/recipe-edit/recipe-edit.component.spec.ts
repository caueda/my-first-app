import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { RecipeService } from './../recipe.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipeEditComponent } from './recipe-edit.component';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [ RecipeService, ShoppingListService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
