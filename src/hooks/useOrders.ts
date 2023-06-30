import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { OrderType } from "utils/types";

export const useOrders = ({
  history = false,
  enabled = true,
  size = 5,
  page = 1,
}: {
  history?: boolean;
  enabled?: boolean;
  size?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: ["orders", history],
    queryFn: () =>
      HttpClient.doGet(`/get/${history ? "done/" : ""}order/list?size=${size}&page=${page}`).then(
        ({ data: response }) => response as OrderType,
      ),
    enabled,
  });
};
export default useOrders;
