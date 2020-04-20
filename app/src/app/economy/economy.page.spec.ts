import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyPage } from './economy.page';

describe('EconomyPage', () => {
  let component: EconomyPage;
  let fixture: ComponentFixture<EconomyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
