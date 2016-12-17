export interface ProductFilter {
    text?: string;
    category?: string;
    state?: string;
    onlySellingProducts?: boolean;
    minimumPrice?: number;
    maximumPrice?: number;
    sellerId?: number;
}
