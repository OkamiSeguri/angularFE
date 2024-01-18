import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSlectorComponent } from './image-slector.component';

describe('ImageSlectorComponent', () => {
  let component: ImageSlectorComponent;
  let fixture: ComponentFixture<ImageSlectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSlectorComponent]
    });
    fixture = TestBed.createComponent(ImageSlectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
