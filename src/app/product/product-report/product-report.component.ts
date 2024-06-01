import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {
  productCountByBrandData: any;
  productCountByProductTypeData: any;
  activeProductsReportData: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadProductCountByBrand();
    this.loadProductCountByProductType();
    this.loadActiveProductsReport();
  }

  loadProductCountByBrand(): void {
    this.dataService.productCountByBrand().subscribe(data => {
      this.productCountByBrandData = data;
      this.createChart('brandChart', 'Product Count by Brand', this.productCountByBrandData);
    });
  }

  loadProductCountByProductType(): void {
    this.dataService.productCountByProductType().subscribe(data => {
      this.productCountByProductTypeData = data;
      this.createChart('productTypeChart', 'Product Count by Product Type', this.productCountByProductTypeData);
    });
  }

  loadActiveProductsReport(): void {
    this.dataService.activeProductsReport().subscribe(data => {
      this.activeProductsReportData = data.map((item: any) => {
        return {
          brand: item.brand,
          productTypes: item.productTypes.map((productType: any) => {
            return {
              productType: productType.productType,
              brands: productType.products.map((product: any) => {
                return {
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  image: product.image
                };
              })
            };
          })
        };
      });
    });
  }
  

  createChart(canvasId: string, label: string, data: any): void {
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(canvasId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: values,
          backgroundColor: ['#90E0EF', '#00B4D8'],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
