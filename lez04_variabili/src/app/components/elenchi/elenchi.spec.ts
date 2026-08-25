import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Elenchi } from './elenchi';

describe('Elenchi', () => {
  let component: Elenchi;
  let fixture: ComponentFixture<Elenchi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elenchi],
    }).compileComponents();

    fixture = TestBed.createComponent(Elenchi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
