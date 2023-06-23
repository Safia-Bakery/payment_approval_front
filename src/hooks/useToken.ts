import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { MeTypes } from "utils/types";

export const useToken = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["me_token"],
    queryFn: () => HttpClient.doGet("/me").then(({ data: response }) => response as MeTypes),
    enabled,
  });
};

export default useToken;
