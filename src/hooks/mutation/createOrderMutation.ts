import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "api/apiClient";

import axios from "axios";
import { CreateOrderType } from "utils/types";

const createOrderMutation = () => {
  return useMutation(["create_order"], (body: CreateOrderType) => {
    return axios.post(`${BASE_URL}/create/order`, body);
  });
};
export default createOrderMutation;
