import { AdsService } from './../services/ads.service';
import { AdsListResponse } from './../models/ads-list-response.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-my-ads-request',
  templateUrl: './my-ads-request.component.html',
  styleUrl: './my-ads-request.component.scss'
})
export class MyAdsRequestComponent implements OnInit{
  adsList$?: Observable<AdsListResponse[]>;
  constructor(
    private adsService: AdsService,
    private ngx: NgxUiLoaderService,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
    this.ngx.start();
    this.adsList$ = this.adsService.getAdstByUser(this.authService.getUser().id);
    this.ngx.stop();
  }

  onDelete(id: any){
    
  }

  
}
