import { PriceRangeType } from "@/types/common";

export type FoodStatus = "AVAILABLE" | "UNAVAILABLE";

export interface FoodType {
    id: string;
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    images: string[];
    priceRange: PriceRangeType;
    status: FoodStatus;
}