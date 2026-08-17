import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/store/hooks";
import { getMe } from "../api/me.api";

export function useMeQuery() {
  const status = useAppSelector((state) => state.auth.status);

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: status === "authenticated",
    retry:false
  });
}
