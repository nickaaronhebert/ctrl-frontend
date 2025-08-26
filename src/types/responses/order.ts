import type { Order } from "../global/commonTypes";

export interface IGetOrderById {
  data: Order;
  message: string;
  code: string;
}

export interface ICreateOrderResponse {
  message: string;
  code: string;
}
