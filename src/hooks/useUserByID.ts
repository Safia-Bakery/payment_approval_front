import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { UsersTypes } from "utils/types";

export const useUserByID = ({ enabled = true, id }: { enabled?: boolean; id: number }) => {
  return useQuery({
    queryKey: ["get_users", id],
    queryFn: () =>
      HttpClient.doGet(`/get/user/with/id/${id}`).then(({ data }) => data as UsersTypes),
    enabled,
    refetchOnMount: true,
  });
};

export default useUserByID;
