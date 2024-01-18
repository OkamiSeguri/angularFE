import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BlogPost } from '../blog-post/models/blog-post.model';
import { BlogPostService } from '../blog-post/services/blog-post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  blogPosts$?: Observable<BlogPost[]>;
  constructor(private blogPostService: BlogPostService,
    private ngx: NgxUiLoaderService) {
  }
  ngOnInit(): void {
    this.ngx.start();
    this.getAllBlogPosts()
    this.ngx.stop();
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }
}
