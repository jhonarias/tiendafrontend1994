export interface Client {
    id?: number;
    identification: string;
    name: string;
    address: string;
    cellphone: string;
    image?: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}
