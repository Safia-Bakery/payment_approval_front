import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { StatusRoles } from "utils/types";

const updateUser = () => {
  return useMutation(["update_user_role"], (body: { role: StatusRoles; user_id: number }) =>
    HttpClient.doPut("/update/user/role", body),
  );
};
export default updateUser;
