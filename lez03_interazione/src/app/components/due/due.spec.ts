import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Due } from './due';

describe('Due', () => {
  let component: Due;
  let fixture: ComponentFixture<Due>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Due],
    }).compileComponents();

    fixture = TestBed.createComponent(Due);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
