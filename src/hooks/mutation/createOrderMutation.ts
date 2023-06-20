import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { CreateOrderType } from "utils/types";

const createOrderMutation = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(["create_order"], (body: CreateOrderType) =>
    HttpClient.doPost("/create/order", body),
  );
};
export default createOrderMutation;
