import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.model';
import { environment } from './../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(
    private http: HttpClient,
  ) { }

  creatBlogPost(data: AddBlogPostRequest) : Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost?addAuth=true`, data)
  }

  getAllBlogPosts() : Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPost`)
  }

  getBlogPostById(id: string) : Observable<BlogPost> {
    return this. http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`)
  }

  updateBlogPost (id: string, updatedBlogPost: UpdateBlogPostRequest) : Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}?addAuth=true`, updatedBlogPost)
  }

  deleteBlogPost(id: string) : Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}?addAuth=true`)
  }

  getBlogPostByUrlHandle(urlHandle: string) : Observable<BlogPost> {
    return this. http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${urlHandle}`)
  }

}
