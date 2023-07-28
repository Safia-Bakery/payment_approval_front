import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { tokenSelector } from "redux/reducers/authReducer";
import { useAppSelector } from "redux/utils/types";
import { OverheadTypes } from "utils/types";

export const useOverhead = ({ enabled = true }: { enabled?: boolean }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["overhead"],
    queryFn: () =>
      HttpClient.doGet("/users/overhead").then(
        ({ data: response }) => (response as OverheadTypes[]) || [],
      ),
    enabled: enabled && !!token,
  });
};
export default useOverhead;
