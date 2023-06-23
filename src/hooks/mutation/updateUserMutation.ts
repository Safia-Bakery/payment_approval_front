import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { Roles } from "utils/types";

const updateUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(["update_user_role"], (body: { role: Roles; user_id: number }) =>
    HttpClient.doPut("/update/user/role", body),
  );
};
export default updateUser;
