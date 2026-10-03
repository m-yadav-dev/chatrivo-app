import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/api.auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
