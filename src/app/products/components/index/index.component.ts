import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public errors: ApiResponse;
  public products: Product[] = [];
  constructor(public productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  protected getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res.data;
      }, error => {
        const errorResponse: ApiResponse = {
          success: error.error.success,
          errors: error.error.errors
        };
        this.errors = errorResponse;
      });
  }

  /**
   * Delete product by id
   * @param id product
   */
  public deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe(
        res => this.getProducts(),
        (error) => {
          const errorResponse: ApiResponse = {
            success: error.error.success,
            errors: error.error.errors
          };
          this.errors = errorResponse;
        }
      );
  }

  /**
   * redirect to page for update product
   * @param id product
   */
  public updateProduct(id: number): void {
    this.router.navigate(['/products/update/', id]);
  }

}
