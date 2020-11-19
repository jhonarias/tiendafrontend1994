import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/categories/models/category.model';
import { EnumProductStatus } from 'src/app/products/enums/product-enum.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public enumProductStatus = EnumProductStatus;
  @Input() productForm: FormGroup;
  @Output() deleteProductEmitter = new EventEmitter<any>();
  @Input() index: number;
  @Input() allowDelete: boolean;
  @Input() categories: Category[];
  constructor() {}

  ngOnInit() {
  }

  /**
   * Check if form control has errors
   * @param control Form control to check
   */
  public controlHasError(control: AbstractControl): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Delete product
   */
  public deleteProduct() {
    this.deleteProductEmitter.emit();
  }

  /**
   * get value file type file
   * @param event type file
   */
  public onFileSelect(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.get('image').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * convert category to string to send to server
   * @param category object
   */
  public convertObjectCategoryToString(category: Category): string {
    return JSON.stringify(category);
  }
}
