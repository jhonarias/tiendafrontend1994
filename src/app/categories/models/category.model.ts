import { EnumCategoryStatus } from './category-status.enum';

export interface Category {
    category_id: number;
    name: string;
    status: EnumCategoryStatus;
    created_at?: Date;
    updated_at?: Date;
}
