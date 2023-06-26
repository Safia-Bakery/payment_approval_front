import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { tokenSelector } from "redux/reducers/authReducer";
import { useAppSelector } from "redux/utils/types";
import { MeTypes } from "utils/types";

export const useToken = ({ enabled = true }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["me_token"],
    queryFn: () => HttpClient.doGet("/me").then(({ data: response }) => response as MeTypes),
    enabled: !!token && enabled,
  });
};

export default useToken;
