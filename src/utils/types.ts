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
export interface RoleList {
  success: boolean;
  listroles: Roles[];
}

export interface UsersTypes {
  username: string;
  hashed_password: string;
  time_created: string;
  id: number;
  role: Roles;
}

export interface OrderType {
  category_id: number;
  purchaser: string;
  seller: string;
  price: number;
  status: string;
  urgent: true;
  description: string;
  id: number;
  product: string;
  delivery_time: Date;
  payer: string;
  time_created: Date;
  image_id: null | string | number;
  payment_type: string;
  image?: string;
  category: string;
}
export interface CreateOrderType {
  category_id: number;
  purchaser: string;
  product: string;
  seller: string;
  delivery_time: Date;
  price: number;
  payer: string;
  urgent: boolean;
  description: string;
  image_id?: string;
  payment_type: string;
}

export enum Roles {
  musa = "musa",
  shakhzod = "shakhzod",
  begzod = "begzod",
  fin = "fin",
  accountant = "accountant",
  unconfirmed = "unconfirmed",
  purchasing = "purchasing",
}

export interface MeTypes {
  id: number;
  username: string;
  role: Roles;
}
export enum Status {
  accepted = "accepted",
  denied = "denied",
}
