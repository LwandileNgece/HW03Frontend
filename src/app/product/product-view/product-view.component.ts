import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Product } from '../../shared/Product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];

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
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }
}
