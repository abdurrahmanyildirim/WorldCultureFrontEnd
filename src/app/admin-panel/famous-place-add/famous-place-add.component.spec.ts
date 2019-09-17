/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FamousPlaceAddComponent } from './famous-place-add.component';

describe('FamousPlaceAddComponent', () => {
  let component: FamousPlaceAddComponent;
  let fixture: ComponentFixture<FamousPlaceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamousPlaceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamousPlaceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
