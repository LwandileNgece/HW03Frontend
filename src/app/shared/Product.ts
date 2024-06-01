import { ProductType } from "./ProductType";
import { Brand } from "./Brand";
export interface Product {
    productId: number;
    name: string;
    description: string;
    dateCreated: Date;
    dateModified?: Date;
    isActive: boolean;
    isDeleted: boolean;
    price: number;
    productTypeId: number;
    brandId: number;
    image: string;
    // Navigation properties
    productType: ProductType;
    brand: Brand;
}