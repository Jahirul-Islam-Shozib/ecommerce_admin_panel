export type OrderStatus = 'Pending'| 'Confirmed' | 'Delivered' | 'Cancel';

export type ListStatus = 'All' | OrderStatus;
export type UpdateStatus = OrderStatus; // same as OrderStatus, just clearer naming

export interface EmployeeInfo {
  employeeId: string;
  name: string;
  company: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
}

export interface OrderItemPayload {
  productId: string;
  productName: string;
  weightValue: string;
  weightUnit: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  brand: string;
  image: string
}

export interface OrderDeliveryOption {
  pickupPoint: string;
  deliveryDay: string;
  paymentMethod: 'Cash';
  deliveryNote: string;
}

export interface OrderSummaryPayload {
  items: OrderItemPayload[];
  subtotal: number;
  tax: number;
  discount: number;
  totalPrice: number;
}

export interface OrderPayload {
  _id: string;
  orderId: string;
  employeeInfo: EmployeeInfo;
  deliveryOption: OrderDeliveryOption;
  orderSummary: OrderSummaryPayload;
  status: OrderStatus;
  createdAt: string;
}
