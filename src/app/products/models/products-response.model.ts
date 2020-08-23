import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Product } from './product.model';

export interface ProductsResponse extends ApiResponse {
    data?: Product[];
}
