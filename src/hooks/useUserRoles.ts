import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { RoleList } from "utils/types";

export const useUserRoles = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["user_roles"],
    queryFn: () =>
      HttpClient.doGet("/get/list/of/roles").then(
        ({ data: response }) => response.listroles as RoleList["listroles"],
      ),
    enabled,
  });
};

export default useUserRoles;
