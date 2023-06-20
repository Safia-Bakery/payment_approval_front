export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}

export interface CategoryTypes {
  id: number;
  name: string;
}

export interface CreateOrderType {
  category_id: number;
  purchaser: string;
  product: string;
  seller: string;
  delivery_time: string;
  price: number;
  payer: string;
  urgent: boolean;
  description: string;
  image?: string;
  payment_type: string;
}
