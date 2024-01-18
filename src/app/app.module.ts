import { DeleteBlogPostComponent } from './views/blog-post/delete-blog-post/delete-blog-post.component';
import { EditBlogPostComponent } from './views/blog-post/edit-blog-post/edit-blog-post.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BlogDetailComponent } from './views/blog-detail/blog-detail.component';
import { EditCategoryComponent } from './views/category/edit-category/edit-category.component';
import { ImageSlectorComponent } from './shared/components/image-slector/image-slector.component';
import { AddBlogPostComponent } from './views/blog-post/add-blog-post/add-blog-post.component';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { AddCategoryComponent } from './views/category/add-category/add-category.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';
// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';


import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CalloutModule,
  CardModule,
  CarouselModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  NavbarModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TableModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MarkdownModule } from 'ngx-markdown';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { Page404Component } from './views/auth/page404/page404.component';
import { Page403Component } from './views/auth/page403/page403.component';
import { Page500Component } from './views/auth/page500/page500.component';
import { CategoryComponent } from './views/category/category.component';
import { HomeComponent } from './views/home/home.component';
import { AddAdsComponent } from './views/ads/add-ads/add-ads.component';


const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent, 
    ...APP_CONTAINERS,  
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page403Component,
    Page500Component,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogPostComponent,
    AddBlogPostComponent,
    EditBlogPostComponent,
    DeleteBlogPostComponent,
    ImageSlectorComponent,
    HomeComponent,
    BlogDetailComponent,
    NavbarComponent,
    AddAdsComponent
  ],
  imports: [
    BrowserModule,
    CardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    NgScrollbarModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    CKEditorModule,
    MarkdownModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    ModalModule,
    CarouselModule,
    NavbarModule,
    ReactiveFormsModule,
    CalloutModule
  ],
  providers: [
    
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    IconSetService,
    Title,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    provideAnimations(),
    provideToastr()

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
