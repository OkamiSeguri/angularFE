import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectorUserComponent } from './image-selector-user.component';

describe('ImageSelectorUserComponent', () => {
  let component: ImageSelectorUserComponent;
  let fixture: ComponentFixture<ImageSelectorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSelectorUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageSelectorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
