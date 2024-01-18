import { HomeComponent } from './views/home/home.component';
import { authGuard } from './views/auth/guards/auth.guard';
import { CategoryComponent } from './views/category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/auth/page404/page404.component';
import { Page403Component } from './views/auth/page403/page403.component';
import { Page500Component } from './views/auth/page500/page500.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { AddBlogPostComponent } from './views/blog-post/add-blog-post/add-blog-post.component';
import { BlogDetailComponent } from './views/blog-detail/blog-detail.component';
import { EditBlogPostComponent } from './views/blog-post/edit-blog-post/edit-blog-post.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'blog/:url',
    component: BlogDetailComponent,
    data: {
      title: 'BlogPost'
    }
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '403',
    component: Page403Component,
    data: {
      title: 'Page 403'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },

  {
    path: 'admin',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      { path: 'content/categories',
      component: CategoryComponent,
      data: {
        title: 'Categories'
      },
      canActivate: [authGuard]
      },
      { path: 'content/blogposts',
      component: BlogPostComponent,
      data: {
        title: 'BlogPosts'
      },
      canActivate: [authGuard]
      },
      { path: 'content/add-blogposts',
      component: AddBlogPostComponent,
      data: {
        title: 'Add BlogPosts'
      },
      canActivate: [authGuard]
      },
      { path: 'content/edit-blogposts/:id',
      component: EditBlogPostComponent,
      data: {
        title: 'Edit BlogPosts'
      },
      canActivate: [authGuard]
      },
    ]
  },
  
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
