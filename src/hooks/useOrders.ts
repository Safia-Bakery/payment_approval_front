import { useQuery } from "@tanstack/react-query";
import HttpClient from "src/api/requestBase";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppSelector } from "src/redux/utils/types";

export const useOrders = ({ history = false, enabled = true }) => {
  const token = useAppSelector(tokenSelector);
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
