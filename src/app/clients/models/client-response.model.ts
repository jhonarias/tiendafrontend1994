import { ApiResponse } from './api-response.model';
import { Client } from './client.model';

export interface ClientResponse extends ApiResponse {
    data?: Client;
}
