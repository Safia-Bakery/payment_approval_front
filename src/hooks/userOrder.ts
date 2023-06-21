import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { OrderType } from "utils/types";

export const useOrder = ({ enabled = true, id }: { enabled?: boolean; id: number }) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () =>
      HttpClient.doGet(`/get/order/with/id/${id}`).then(({ data }) => data as OrderType),
    enabled,
  });
};

export default useOrder;
