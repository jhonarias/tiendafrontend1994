import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  @Input() productForm: FormGroup;
  @Output() deleteProductEmitter = new EventEmitter<any>();
  @Input() index: number;
  @Input() allowDelete: boolean;
  constructor() {}

  ngOnInit() {}

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
}
