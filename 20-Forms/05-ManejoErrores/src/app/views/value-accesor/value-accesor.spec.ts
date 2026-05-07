import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAccesor } from './value-accesor';

describe('ValueAccesor', () => {
  let component: ValueAccesor;
  let fixture: ComponentFixture<ValueAccesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueAccesor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueAccesor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
