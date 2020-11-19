import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/categories/models/category.model';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ApiResponse } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public productsForm = new FormGroup({});
  public categories: Category[];
  public errors: ApiResponse;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    protected categoryService: CategoryService
  ) {}

  /**
   * Initialize first product
   */
  ngOnInit() {
    this.getCategories();
    this.addProduct();
  }

  /**
   * build the form of product
   */
  protected buildForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      category: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]*'),
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]*'),
      ]),
      iva: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]*'),
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
      image: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  /**
   * Add new product in productsForm
   */
  public addProduct() {
    const form = this.buildForm();
    this.buildFormProduct(form);
  }

  /**
   * build of a new product
   * @param form the form build
   */
  protected buildFormProduct(form: FormGroup) {
    this.productsForm.addControl('form_' + this.generateFormId(), form);
  }

  /**
   *  get form keys of a each form control
   */
  public getFormKeys(): string[] {
    return Object.keys(this.productsForm.controls);
  }

  /**
   * generate ramdom form id
   */
  protected generateFormId(): string {
    return 'products'; //Math.random().toString(36).slice(2); cuiando sea multiple descomentar esta linea
  }

  /**
   * All the product the be saved in the server
   */
  public addProducts() {
    console.log(this.productsForm.value);
    const formData = new FormData();
    formData.append('name', this.productsForm.get('form_products.name').value);
    formData.append('category', this.productsForm.get('form_products.category').value);
    formData.append('description', this.productsForm.get('form_products.description').value);
    formData.append('price', this.productsForm.get('form_products.price').value);
    formData.append('quantity', this.productsForm.get('form_products.quantity').value);
    formData.append('iva', this.productsForm.get('form_products.iva').value);
    formData.append('status', this.productsForm.get('form_products.status').value);
    formData.append('image', this.productsForm.get('form_products.image').value);
    this.productService.createProduct(formData)
      .subscribe(
        res => {
          this.router.navigate(['/products']);
        },
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
   * delete product
   * @param key form
   */
  public deleteProduct(key: string) {
    this.productsForm.removeControl(key);
  }

  /**
   * if is > 1 allow delete products
   */
  public canDeleteProduct(): boolean {
    return this.getFormKeys().length > 1;
  }

  /**
   * Get categories of api
   */
  protected getCategories(): void {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.data;
    });
  }
}
