import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public productsForm = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Initialize first product
   */
  ngOnInit() {
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
    return Math.random().toString(36).slice(2);
  }

  /**
   * All the product the be saved in the server
   */
  public addProducts() {
    console.log(this.productsForm.value);
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
}
