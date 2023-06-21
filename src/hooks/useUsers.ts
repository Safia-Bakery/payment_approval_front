import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { UsersTypes } from "utils/types";

export const useUsers = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["get_users"],
    queryFn: () =>
      HttpClient.doGet("/get/user/list/with/role").then(
        ({ data: response }) => response as UsersTypes[],
      ),
    enabled,
    refetchOnMount: true,
  });
};

export default useUsers;
