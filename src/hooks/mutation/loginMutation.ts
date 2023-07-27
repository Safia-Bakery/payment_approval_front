import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";

const loginMutation = () => {
  return useMutation(["login"], ({ username, password }: { username: string; password: string }) =>
    HttpClient.doPost("/login", { username, password }),
  );
};
export default loginMutation;
