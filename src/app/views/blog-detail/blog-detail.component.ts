import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../blog-post/services/blog-post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  url:string | null = null;
  blogPost$?: Observable<BlogPost>
  blogPostList$?: Observable<BlogPost[]>
  public Editor = ClassicEditor;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogPostService: BlogPostService,
    private ngx: NgxUiLoaderService
  ){}
  ngOnInit(): void {
    this.ngx.start();
    this.route.paramMap.subscribe({
      next: (params) => {        
        this.url = params.get('url')
      }
    })

    //Fetch blog post
    if(this.url){
      this.blogPost$ =  this.blogPostService.getBlogPostByUrlHandle(this.url);
      this.ngx.stop();
    }

    //Get All Blog Posts
    this.blogPostList$ = this.blogPostService.getAllBlogPosts();

  }

  
}
