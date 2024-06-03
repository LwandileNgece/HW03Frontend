import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Brand } from '../../shared/Brand';
import { ProductType } from '../../shared/ProductType';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  brands: Brand[] = [];
  productTypes: ProductType[] = [];
  selectedFile: File | null = null;  // Variable to store the selected file

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadBrands();
    this.loadProductTypes();
  }

  initializeForm(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  loadBrands(): void {
    this.dataService.getAllBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  loadProductTypes(): void {
    this.dataService.getAllProductTypes().subscribe(productTypes => {
      this.productTypes = productTypes;
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const product = this.addProductForm.value;
      if (this.selectedFile) {
        // Prepare FormData to send image file along with product data
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('brandId', product.brandId);
        formData.append('productTypeId', product.productTypeId);

        this.dataService.addProduct(product, formData).subscribe(
          newProduct => {
            this.router.navigate(['/product-view']);
            alert(`${newProduct.name} created successfully`);
          },
          error => {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
          }
        );
      } else {
        alert('Please select an image.');
      }
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];  // Store the selected file
  }

  validateNumericInput(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
