import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarfillComponent } from './starfill.component';

describe('StarfillComponent', () => {
  let component: StarfillComponent;
  let fixture: ComponentFixture<StarfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
