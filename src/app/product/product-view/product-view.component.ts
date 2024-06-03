import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Product } from '../../shared/Product';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  displayedProducts: Product[] = [];
  pageSize: number = 3;
  currentPage: number = 1;
  searchText: string = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.productForm = this.formBuilder.group({
      searchText: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.dataService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.applyFilter();
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }

  applyFilter(): void {
    const searchTextControl = this.productForm.get('searchText');
    if (searchTextControl) {
      const searchText = searchTextControl.value.toLowerCase();
  
      this.displayedProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.price.toString().toLowerCase().includes(searchText) ||
        // product.brandId.toLowerCase().includes(searchText) ||
        // product.productTypeId.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)
      );
  
      this.currentPage = 1;
      this.updateDisplayedProducts();
    }
  }
  

  sortBy(key: keyof Product): void {
    this.displayedProducts = this.displayedProducts.sort((a, b) => {
      const x = (a[key] || '').toString().toLowerCase();
      const y = (b[key] || '').toString().toLowerCase();
      return x.localeCompare(y);
    });
    this.updateDisplayedProducts();
  }

  changePageSize(): void {
    this.currentPage = 1;
    this.applyFilter(); // Update the displayed products after changing the page size
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    // Slice the displayed products based on the current page and page size
    this.displayedProducts = this.displayedProducts.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const pageCount = this.displayedProducts.length / this.pageSize;
    return Array(Math.ceil(pageCount)).fill(0).map((x, i) => i + 1);
  }
}
