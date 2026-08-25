import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompoDue } from './compo-due';

describe('CompoDue', () => {
  let component: CompoDue;
  let fixture: ComponentFixture<CompoDue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoDue],
    }).compileComponents();

    fixture = TestBed.createComponent(CompoDue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
