import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  clientForm: FormGroup;
  public apiUrl = environment.publicServer;
  public clientImage: string;
  public id: number;
  public errors: ApiResponse;

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientForm = this.fb.group({
      id: new FormControl(''),
      identification: new FormControl('',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$')
        ]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      address: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      image: new FormControl(''),
      email: new FormControl(''),
    });
    // endpoint for update client
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.clientFindById(id);
    }
  }

  /**
   * Check if form control has errors
   * @param control Form control to check
   */
  public controlHasError(control: AbstractControl): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * get value file type file
   * @param event type file
   */
  public onFileSelect(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.clientForm.get('image').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Save a client, do request to server
   */
  public saveClient(): void {
    const formData = new FormData();
    formData.append('identification', this.clientForm.get('identification').value);
    formData.append('name', this.clientForm.get('name').value);
    formData.append('address', this.clientForm.get('address').value);
    formData.append('cellphone', this.clientForm.get('cellphone').value);
    formData.append('email', this.clientForm.get('email').value);
    formData.append('image', this.clientForm.get('image').value);
    this.clientService.createClient(formData)
      .subscribe(
        res => {
          this.router.navigate(['/clients']);
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
   * Call to api for get client by id
   * @param id client
   */
  protected clientFindById(id: number): void {
    this.clientService.getClient(id)
      .subscribe(
        data => {
          const client: Client = data.data;
          this.clientForm.get('id').setValue(client.id);
          this.clientForm.get('identification').setValue(client.identification);
          this.clientForm.get('name').setValue(client.name);
          this.clientForm.get('address').setValue(client.address);
          if (client.image) {
            this.clientImage = this.apiUrl + client.image;
          }
          this.clientForm.get('cellphone').setValue(client.cellphone);
          this.clientForm.get('email').setValue(client.email);
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

  public updateClient(): void {
    const formData = new FormData();
    formData.append('name', this.clientForm.get('name').value);
    formData.append('address', this.clientForm.get('address').value);
    formData.append('cellphone', this.clientForm.get('cellphone').value);
    formData.append('email', this.clientForm.get('email').value);
    formData.append('image', this.clientForm.get('image').value);
    this.clientService.updateClient(formData, this.clientForm.get('id').value)
      .subscribe(
        res => {
          this.router.navigate(['/clients']);
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
}
