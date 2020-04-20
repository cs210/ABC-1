import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentPage } from './government.page';

describe('GovernmentPage', () => {
  let component: GovernmentPage;
  let fixture: ComponentFixture<GovernmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
