import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
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
      image: ['', Validators.required] // File upload control
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
      this.dataService.addProduct(product).subscribe(
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
      alert('Please fill all required fields correctly.');
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split('.').pop().toLowerCase();
  
      // Extract only the file name and extension from the fake path
      const fakePathParts = fileName.split('\\');
      const extractedFileName = fakePathParts[fakePathParts.length - 1];
  
      // Update the form control value with the extracted file name
      this.addProductForm.patchValue({
        image: extractedFileName
      });
    }
  }

  // Function to allow only numeric input for price field
  validateNumericInput(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
