// ApiInterfaces.ts
export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
}

export interface ApiResult<T> {
    success: boolean;
    message: string;
    error: string;
    data: T;
}

export type ProductResponse = ApiResult<Product[]>;



// ApiInterfaces.ts
export interface Account {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

export interface ApiResultAccount<T> {
    success: boolean;
    message: string;
    error: string;
    data: T;
}

export type AccountResponse = ApiResultAccount<Account[]>;

export type EmailFormat = `${string}@${string}.${string}`;