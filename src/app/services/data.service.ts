import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Product } from '../shared/Product';
import { ProductType } from '../shared/ProductType';
import { Brand } from '../shared/Brand';
import { User } from '../shared/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://localhost:7012/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }

  GetCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
  }
  // Authentication
  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/registerUser`, user,this.httpOptions);
  }

  loginUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/loginUser`, user,this.httpOptions);
  }
  //store
  getAllProducts(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Store/GetAllProducts`,this.httpOptions)
  }
  getAllProductTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Store/GetAllProductTypes`,this.httpOptions)
  }
  getAllBrands(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Store/GetAllBrands`,this.httpOptions)
  }
  // addProduct(product: Product, formData: FormData): Observable<Product> {
  //   // Append image data to the product object
  //   formData.append('image', product.image);
  //   return this.httpClient.post<Product>(`${this.apiUrl}Store/addProduct`, formData, this.httpOptions);
  // }
  addProduct(product: Product, formData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}Store/addProduct`, formData);
  }
  //report
  productCountByBrand(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/productCountByBrand`,this.httpOptions)
  }
  productCountByProductType(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/productCountByProductType`,this.httpOptions)
  }
  activeProductsReport(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/activeProductsReport`,this.httpOptions)
  }
}


