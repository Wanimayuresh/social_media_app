import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { useAppDispatch } from "@/app/store/hooks";
import { setAuthenticated } from "../store/authSlice";

export function useLoginMutation(){
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn:login,
        onSuccess:(response)=>{
            dispatch(setAuthenticated(response.accessToken))
        }
    })
}