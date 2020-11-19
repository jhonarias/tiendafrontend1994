import { Category } from './category.model';

export interface CategoriesResponse {
    success: boolean;
    data?: Category[];
}
