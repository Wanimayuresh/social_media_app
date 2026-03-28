import { Button } from "../../components/ui/button";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import logo from "../../assets/images/logo.svg";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "../../lib/validation";
import { Field, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Link } from "react-router-dom";
import { createUserAccount } from "../../lib/appwrite/api";
import { toast } from "sonner";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpFormSchema),
    mode: "onSubmit",
  });

  const handleSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    const newUser = await createUserAccount(data);
    if (!newUser) {
      return;
    }
    toast("Sign up failed. Please try again");

    // const session = await signInAccount()
  };
  return (
    <>
      <div className="sm:w-420 flex-center flex-col p-2 space-y-4">
        <img src={logo} alt="logo" />
        <h2 className="h3 bold md:h2-bold pt-5 sm:pt-4">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram enter account details
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-420 space-y-4"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />

          <Controller
            name="username"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>User Name</FieldLabel>
                <Input {...field} />
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...field} type="email" />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input {...field} type="password" />
              </Field>
            )}
          />
        </FieldGroup>
        <div className="space-x-4">
          <Button type="submit">Click me</Button>
          <Button type="button" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
        <div>
          Already a member?{" "}
          <Link
            to="/sign-in"
            className="text-primary-500 text-small-semibold ml-1 cursor-pointer"
          >
            login
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
