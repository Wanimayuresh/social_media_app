import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formImage from "@/assets/Form Image.png";
import {
  Field,
//   FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSignUpMutation } from "../queries/useSignUpMutation";
import { signUpSchema, type SignUpSchema } from "../validation/auth.schema";

const SignUp = () => {

    const signUpMutation = useSignUpMutation()

    const {register,handleSubmit,formState:{errors},} = useForm<SignUpSchema>({
        resolver:zodResolver(signUpSchema),
        defaultValues:{
            username:"",
            email:"",
            password:""
        }
    })

    const onSubmit =(values:SignUpSchema)=>{
        signUpMutation.mutate(values,{
            onError:(error)=>{
                toast.add({
                    type:"error",
                    title:"SignUp Failed",
                    description:error.message.includes("401")
                    ?  "Unable to create your account. Please try again."
                    :  "Something went wrong. Please try again."
                })
            }
        })
    }
  return (
   <div className="dark flex min-h-screen bg-background text-foreground">
      {/* Img */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src={formImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
             Join Instagram and start sharing.
            </p>
          </div>

          <form noValidate className="space-y-5" onSubmit={handleSubmit(onSubmit)} >
            <Field data-invalid={!!errors.username}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                className="h-10"
                aria-invalid={!!errors.username}
                {...register("username")}
              />
              <FieldError errors={[errors.username]} />
            </Field>

             <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-10"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-10"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
              {/* <FieldDescription className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </FieldDescription> */}
            </Field>

            <Button
              type="submit"
              size="lg"
              className="h-10 w-full"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? "Creating account…" : "Sign up"}
            </Button>
          </form>

   

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
