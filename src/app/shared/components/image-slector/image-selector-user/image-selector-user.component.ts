import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogImage } from 'src/app/shared/models/blog-image.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageService } from '../image.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddAdsComponent } from 'src/app/views/ads/add-ads/add-ads.component';

@Component({
  selector: 'app-image-selector-user',
  templateUrl: './image-selector-user.component.html',
  styleUrl: './image-selector-user.component.scss'
})
export class ImageSelectorUserComponent {
  public visible = false;
  private file?: File
  fileName: string = ''
  title: string = ''
  images?: BlogImage

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;
  
  constructor(private imageService : ImageService,
    private ngx: NgxUiLoaderService){}


  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(){
    this.ngx.start();
    if(this.file && this.fileName!=='' && this.title!==''){
      this.imageService.uploadImage(this.file, this.fileName,this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm()
          this.images = response
          this.ngx.stop()
        }
        
      })
    } 
  }


  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }



}