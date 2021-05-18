import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoviesComponent } from './view-movies.component';

describe('ViewMoviesComponent', () => {
  let component: ViewMoviesComponent;
  let fixture: ComponentFixture<ViewMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
