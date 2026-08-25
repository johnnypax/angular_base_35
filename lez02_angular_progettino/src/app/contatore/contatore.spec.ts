import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contatore } from './contatore';

describe('Contatore', () => {
  let component: Contatore;
  let fixture: ComponentFixture<Contatore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contatore],
    }).compileComponents();

    fixture = TestBed.createComponent(Contatore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
