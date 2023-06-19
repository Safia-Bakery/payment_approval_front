import { useMutation } from "@tanstack/react-query";
import HttpClient from "src/api/requestBase";

const mutationPhone = () => {
  return useMutation(["auth", "phone"], ({ phone }: { phone: string }) =>
    HttpClient.doPost("/verification", { phone }),
  );
};
export default mutationPhone;
