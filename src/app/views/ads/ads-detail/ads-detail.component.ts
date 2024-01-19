import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ads } from '../models/ads.model';
import { Observable } from 'rxjs';
import { AdsService } from '../services/ads.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ads-detail',
  templateUrl: './ads-detail.component.html',
  styleUrl: './ads-detail.component.scss'
})
export class AdsDetailComponent implements OnInit{
  id:string | null = null;
  ads?: Ads;
  visible = false;
  public Editor = ClassicEditor;
  
  constructor(
    private adsService: AdsService,
    private ngx: NgxUiLoaderService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    this.ngx.start();
    this.route.paramMap.subscribe({
      next: (params) => {        
        this.id = params.get('id')
      }
    })

    //Fetch detail
    if(this.id){
       this.adsService.getAdsById(this.id).subscribe({
        next: (response) => {
          this.ads = response;
          this.ngx.stop();
        },
        error: (error) => {
          this.ngx.stop();
          console.log(error);
        }
      });
      this.ngx.stop();
    }
  }
  toggleCollapse(): void {
    this.visible = !this.visible;
  }
}
