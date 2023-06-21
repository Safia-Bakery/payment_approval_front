import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { OrderType } from "utils/types";

export const useOrders = ({ history = false, enabled = true }) => {
  return useQuery({
    queryKey: ["orders", history],
    queryFn: () =>
      HttpClient.doGet("/get/order/list", history && { history: true }).then(
        ({ data: response }) => response as OrderType[],
      ),
    enabled,
  });
};

export default useOrders;
