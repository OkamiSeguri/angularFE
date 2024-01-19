import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdsRequestComponent } from './my-ads-request.component';

describe('MyAdsRequestComponent', () => {
  let component: MyAdsRequestComponent;
  let fixture: ComponentFixture<MyAdsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAdsRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAdsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
