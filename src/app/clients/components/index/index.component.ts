import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ApiResponse } from '../../models/api-response.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public clients: Client[];
  public errors: ApiResponse;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.clients = [];
    this.getClients();
  }

  /**
   * get clients
   */
  protected getClients(): void {
    this.clientService.getClients().subscribe(
      (res) => {
        this.clients = res.data;
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
   * Delete client by id
   * @param id client
   */
  public deleteClient(id: number): void {
   this.clientService.deleteClient(id)
   .subscribe(
    res => this.getClients(),
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
   * redirect to page for update client
   * @param id client
   */
  public updateClient(id: number): void {
    this.router.navigate(['/clients/update/', id ]);
  }
}

