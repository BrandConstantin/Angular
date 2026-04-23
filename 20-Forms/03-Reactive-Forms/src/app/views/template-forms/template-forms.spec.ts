import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateForms } from './template-forms';

describe('TemplateForms', () => {
  let component: TemplateForms;
  let fixture: ComponentFixture<TemplateForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
