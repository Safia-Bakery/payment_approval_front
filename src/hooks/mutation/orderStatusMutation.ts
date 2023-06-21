import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { Status } from "utils/types";

const orderStatusMutation = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    ["update_order_status"],
    ({ order_id, status }: { order_id: number; status: Status }) =>
      HttpClient.doPut(`/order/accept/reject/${order_id}/${status}`),
  );
};
export default orderStatusMutation;
