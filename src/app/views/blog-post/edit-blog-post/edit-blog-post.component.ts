import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from 'src/app/shared/components/image-slector/image.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.model';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrl: './edit-blog-post.component.scss'
})
export class EditBlogPostComponent implements OnInit, OnDestroy {
  
  public Editor = ClassicEditor;
  id : string | null = null;
  routeSubscription?: Subscription;
  editBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  getBlogPostByIdSubscription?: Subscription;
  blogPost ?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategory?: string[];
  isImageSelectorVisibale: boolean = false;
  imageSelectSubscription?: Subscription;
  user?: User;

  constructor(private route: ActivatedRoute, private ngx: NgxUiLoaderService, private blogPostService: BlogPostService, private categoryService: CategoryService, private router: Router, private imageService: ImageService
    ,private toastr : ToastrService,     private authService :AuthService    ) { }
  ngOnInit(): void {
    this.ngx.start();
    this.categories$ = this.categoryService.getAllCategories()
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id){
          this.getBlogPostByIdSubscription =  this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.blogPost = response;
              this.selectedCategory = response.categories.map(x => x.id);
              this.ngx.stop();
             },
             error: (error) => {
               this.ngx.stop();  
               console.log(error);
             }
          })
        }

        this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
          next: (response) => {
            if(this.blogPost){
               this.blogPost.featuredImageUrl = response.url
               this.isImageSelectorVisibale = false               
            }
          }
        })
      }
    });
    this.user = this.authService.getUser()

    
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.editBlogPostSubscription?.unsubscribe();
    this.getBlogPostByIdSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

  onFormSubmit(){
    this.ngx.start()
    //Convert this model into request object
    if(this.blogPost && this.id){
      var updatedBlogPost : UpdateBlogPostRequest = {
        title: this.blogPost.title,
        shortDescription: this.blogPost.shortDescription,
        content: this.blogPost.content,
        featuredImageUrl: this.blogPost.featuredImageUrl,
        urlHandle: this.blogPost.urlHandle,
        publishedDate: this.blogPost.publishedDate,
        author: this.blogPost.author.id,
        isVisible: this.blogPost.isVisible,
        categories: this.selectedCategory ?? []
      }

       this.editBlogPostSubscription =  this.blogPostService.updateBlogPost(this.id, updatedBlogPost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/content/blogposts')
          this.ngx.stop();
          this.toastr.success("Blog post updated successfully!")
        },
        error: (error) => {
          this.ngx.stop();
          console.log(error);
          this.toastr.error("Something went wrong!")
        }
      })
    }
  }

  onDelete(){
    this.ngx.start()
      if(this.id){
          this.blogPostService.deleteBlogPost(this.id).subscribe({
            next: (response) => {
              this.router.navigateByUrl('/admin/blogposts')
              this.ngx.stop();
            },
            error: (error) => {
              this.ngx.stop();
              console.log(error);
            }
          })
      }
  }

  openImageSelector(){
    this.isImageSelectorVisibale  = true;
  }

  closeImageSelector(){
    this.isImageSelectorVisibale  = false;
  }

}
