import { AdsService } from './../services/ads.service';
import { AddAdsRequest } from './../models/add-ads-request.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from 'src/app/shared/components/image-slector/image.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrl: './add-ads.component.scss'
})
export class AddAdsComponent implements OnInit{
  public visible = false;
  public Editor = ClassicEditor;
  model: AddAdsRequest;
  categories$?: Observable<Category[]>;
  isImageSelectorVisibale: boolean = false;
  imageSelectSubscription?: Subscription;
  user?: User;


  constructor(
    private blogPostService: BlogPostService,
    private ngx: NgxUiLoaderService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService : ImageService,
    private adsService: AdsService,
    private authService: AuthService,
    private toastr : ToastrService
  ) {
    this.model = {
      company: '',
      userId: '',
      adsImage: '',
      type: 0,
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (response) => {
        if(this.model){
           this.model.featuredImageUrl = response.url
           this.isImageSelectorVisibale = false               
        }
      }
    })
    this.model.userId = this.authService.getUser().id
    
  }


  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  onFormSubmit = () => {
    this.ngx.start();
    this.adsService.creatAds(this.model)
    .subscribe({
       next: (response) => {
        this.ngx.stop();
        this.visible = false;
        this.router.navigateByUrl('/admin/content/blogposts');
        this.toastr.success("Blog post created successfully!")
       },
       error: (error) => {
         this.ngx.stop();
         console.log(error);
         this.toastr.error("Something went wrong!")
       }
    });
  }

  openImageSelector(){
    this.isImageSelectorVisibale  = true;
  }

  closeImageSelector(){
    this.isImageSelectorVisibale  = false;
  }

}
