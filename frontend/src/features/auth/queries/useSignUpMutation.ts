import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/auth.api";
import { useAppDispatch } from "@/app/store/hooks";
import { setAuthenticated } from "../store/authSlice";

export function useSignUpMutation(){
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn:signUp,
        onSuccess:(response)=>{
            dispatch(setAuthenticated(response.accessToken))
        }
    })
}