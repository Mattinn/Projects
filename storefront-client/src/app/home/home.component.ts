import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products, Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }

  productUrl: string = 'http://localhost:3000/clothes';

  products: Product[] = [];

  totalRecords: number = 0;

  onProductOutput = (product: Product) => console.log(product, 'output');

  onPageChange = (event: any) => this.fetchProducts(event.page, event.rows);

  fetchProducts = (page: number, perPage: number) => {
    this.productsService
      .getProducts(this.productUrl, { page, perPage })
      .subscribe({
        next: (response: Products) => {
          this.products = response.items;
          this.totalRecords = response.total;
        },
        error: (error: any) => console.error(error)
      });
  };

  editProduct = (product: Product, id: number) => {
    this.productsService
      .editProduct(`${this.productUrl}/${id}`, product)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.fetchProducts(1, 5);
        },
        error: (error: any) => console.error(error)
      });
  }

  deleteProduct = (id: number) => {
    this.productsService
      .deleteProduct(`${this.productUrl}/${id}`)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.fetchProducts(1, 5);
        },
        error: (error: any) => console.error(error)
      });
  }

  addProduct = (product: Product) => {
    this.productsService
      .addProduct(this.productUrl, product)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.fetchProducts(1, 5);
        },
        error: (error: any) => console.error(error)
      });
  }

  ngOnInit() {
    this.fetchProducts(1, 5);
  }

}
