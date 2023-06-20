import { useQuery } from "@tanstack/react-query";
import HttpClient from "api/requestBase";
import { CategoryTypes } from "utils/types";

export const useCategories = ({ enabled = false }) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      HttpClient.doGet("/get/list/category").then(
        ({ data: response }) => response as CategoryTypes[],
      ),
    enabled,
  });
};

export default useCategories;
