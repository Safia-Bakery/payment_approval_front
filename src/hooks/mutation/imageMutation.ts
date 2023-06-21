import { useMutation } from "@tanstack/react-query";
import HttpClient from "api/requestBase";

const imageMutation = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(["image_upload"], (body: any) => {
    return HttpClient.doPost("/image/upload", body);
  });
};
export default imageMutation;
