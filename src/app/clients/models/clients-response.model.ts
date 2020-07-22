import { ApiResponse } from './api-response.model';
import { Client } from './client.model';

export interface ClientsResponse extends ApiResponse {
    data?: Client[];
}
