import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogImage } from '../../models/blog-image.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-slector',
  templateUrl: './image-slector.component.html',
  styleUrls: ['./image-slector.component.css']
})
export class ImageSlectorComponent implements OnInit{
  public visible = false;
  private file?: File
  fileName: string = ''
  title: string = ''
  images$?: Observable<BlogImage[]>

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;
  
  constructor(private imageService : ImageService,
    private ngx: NgxUiLoaderService){}
  ngOnInit(): void {
    this.getImages();
  }

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
          this.getImages();
          this.ngx.stop();
        }
        
      })
    } 
  }

  private getImages(){
    this.ngx.start();
    this.images$ = this.imageService.getAllImages();
    this.ngx.stop();
  }

  selectImage(image: BlogImage):void {
    this.imageService.selectImage(image);
    this.openDialog()
  }

  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

}
