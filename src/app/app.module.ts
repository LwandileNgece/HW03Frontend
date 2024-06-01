import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './course/courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductReportComponent } from './product/product-report/product-report.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginComponent,
    RegisterComponent,
    ProductViewComponent,
    AddProductComponent,
    ProductReportComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
