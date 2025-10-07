export interface Product {
  _id: string;
  name: string;
  brand: string;
  company: string;
  image: string;
  discountedPrice: number;
  originalPrice: number;
  weightValue: number;
  weightUnit: string;
  previewImage?: string;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
}
