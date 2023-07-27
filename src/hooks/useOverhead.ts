import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { OverheadTypes } from "utils/types";

export const useOverhead = ({ enabled = true }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["overhead"],
    queryFn: () =>
      HttpClient.doGet("/users/overhead").then(
        ({ data: response }) => (response as OverheadTypes[]) || [],
      ),
    enabled,
  });
};
export default useOverhead;
