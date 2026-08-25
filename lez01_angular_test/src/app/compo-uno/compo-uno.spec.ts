import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompoUno } from './compo-uno';

describe('CompoUno', () => {
  let component: CompoUno;
  let fixture: ComponentFixture<CompoUno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoUno],
    }).compileComponents();

    fixture = TestBed.createComponent(CompoUno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
