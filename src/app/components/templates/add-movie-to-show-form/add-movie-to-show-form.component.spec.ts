import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieToShowFormComponent } from './add-movie-to-show-form.component';

describe('AddMovieToShowFormComponent', () => {
  let component: AddMovieToShowFormComponent;
  let fixture: ComponentFixture<AddMovieToShowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovieToShowFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieToShowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
