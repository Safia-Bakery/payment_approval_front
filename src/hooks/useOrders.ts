import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";

export const useOrders = ({ history = false, enabled = true }) => {
  return useQuery({
    queryKey: ["orders", history],
    queryFn: () =>
      HttpClient.doGet("/user/orders", history && { history: true }).then(
        ({ data: response }) => response?.data as [],
      ),
    enabled,
  });
};

export default useOrders;
