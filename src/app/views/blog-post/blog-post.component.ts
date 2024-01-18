import { BlogPostService } from './services/blog-post.service';
import { BlogPost } from './models/blog-post.model';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeleteBlogPostComponent } from './delete-blog-post/delete-blog-post.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  blogPosts$?: Observable<BlogPost[]>;
  @ViewChild(DeleteBlogPostComponent) addView!: DeleteBlogPostComponent
  constructor(
    private blogpostService: BlogPostService,
    private ngx: NgxUiLoaderService
  ){

  }

  ngOnInit(): void {
    this.ngx.start();
    this.getAllBlogPosts();
    this.ngx.stop();
  }

  getAllBlogPosts(){
      return this.blogPosts$ =  this.blogpostService.getAllBlogPosts()
  }

  onDelete(id:string){
    this.addView.getById(id);
  }
}
