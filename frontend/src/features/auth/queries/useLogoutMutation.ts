import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth.api";
import { useAppDispatch } from "@/app/store/hooks";
import { setUnauthenticated } from "../store/authSlice";
import { queryClient } from "@/app/config/queryClient";

export function useLogoutMutation(){
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn:logout,
        onSettled() {
            dispatch(setUnauthenticated())
            queryClient.removeQueries({ queryKey: ["me"] })
        },
    })
}