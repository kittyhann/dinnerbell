import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedConfirmationComponent } from './booked-confirmation.component';

describe('BookedConfirmationComponent', () => {
  let component: BookedConfirmationComponent;
  let fixture: ComponentFixture<BookedConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
