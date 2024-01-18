import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-delete-blog-post',
  
  templateUrl: './delete-blog-post.component.html',
  styleUrl: './delete-blog-post.component.scss'
})
export class DeleteBlogPostComponent {
  public visible = false;
  blogPost: BlogPost
  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private ngx : NgxUiLoaderService,
    private toastr : ToastrService
  ){
    

  }


  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  onDelete() {
    this.ngx.start()
    if(this.blogPost.id){
        this.blogPostService.deleteBlogPost(this.blogPost.id).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/content/blogposts')
            this.ngx.stop();
            this.openDialog()
          },
          error: (error) => {
            this.ngx.stop();
            console.log(error);
          }
        })
    }
  }

  getById(id: string){
   this.openDialog();
   this.blogPostService.getBlogPostById(id).subscribe({
     next: (blogPost: BlogPost) => {
       this.blogPost = blogPost;
       
     },
     error: (error) => {
       this.toastr.error(error);
     }
   })
  }

}
