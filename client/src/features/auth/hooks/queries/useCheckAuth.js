import { useQuery } from "@tanstack/react-query";
import { checkAuthApi } from "../../api/api.auth";

const useCheckAuth = () => {
  return useQuery({
    queryFn: checkAuthApi,
    queryKey: ["auth", "check"],
  });
};

export default useCheckAuth;
