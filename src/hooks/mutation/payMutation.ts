import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { errorToast } from "utils/toast";

interface BodyType {
  paid_amount: number;
  nakladnoy: string;
  order_id: number;
}
const payMutation = () => {
  return useMutation(["payed_amount"], (body: BodyType) =>
    HttpClient.doPut(`/order/pay`, body)
      .then(({ data }) => data)
      .catch((e: Error) => errorToast(e.message)),
  );
};
export default payMutation;
