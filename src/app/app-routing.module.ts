import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses/courses.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductReportComponent } from './product/product-report/product-report.component';


const routes: Routes = [
  {path: 'courses', component: CoursesComponent},  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirecting to login
  { path: 'register', component: RegisterComponent },
  { path: 'product-view', component:ProductViewComponent},
  { path: 'product-report', component:ProductReportComponent},
  { path: 'add-product', component:AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
