import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Singolo } from './singolo';

describe('Singolo', () => {
  let component: Singolo;
  let fixture: ComponentFixture<Singolo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Singolo],
    }).compileComponents();

    fixture = TestBed.createComponent(Singolo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
