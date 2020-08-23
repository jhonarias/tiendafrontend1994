import { EnumProductStatus } from './product-status.enum';
import { Category } from 'src/app/categories/models/category.model';

export interface Product {
    product_id?: number;
    category?: Category;
    name: string;
    description: string;
    price: number;
    quantity: number;
    iva: number;
    status: EnumProductStatus;
    barcode: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
}
