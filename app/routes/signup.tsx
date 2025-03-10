import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
// import { signup } from "~/database/user";
import { getUserId, setUserId } from "~/lib/session";

import type { Route } from "./+types/signup";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    verifyPassword: z.string(),
  })
  .refine(({ password, verifyPassword }) => password === verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  });

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return submission.reply({ hideFields: ["password"] });
  }

  const { email, password } = submission.value;

  // try {
  //   const user = await signup(email, password);

  //   if (!user) {
  //     return submission.reply({
  //       hideFields: ["password"],
  //       fieldErrors: {
  //         password: ["Invalid username or password"],
  //       },
  //     });
  //   }

  //   setUserId(user.id);
  // } catch (error) {
  //   console.error(error);
  //   return submission.reply({
  //     hideFields: ["password"],
  //     fieldErrors: {
  //       password: ["Invalid username or password"],
  //     },
  //   });
  // }

  throw redirect("/dashboard");
}

export async function loader() {
  const userId = getUserId();
  if (typeof userId === "number") {
    throw redirect("/dashboard");
  }
}

export default function Signup({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const [form, fields] = useForm({
    shouldValidate: "onSubmit",
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            {...getFormProps(form)}
            method="post"
            className="grid gap-4"
            onSubmit={(event) => {
              if (submitting) {
                event.preventDefault();
              }
              form.onSubmit(event);
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...getInputProps(fields.email, { type: "email" })}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="current-email"
                required
              />
              {fields.email.errors?.map((error, key) => (
                <div
                  key={`${key} | ${error}`}
                  className="text-destructive text-sm"
                >
                  {error}
                </div>
              ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...getInputProps(fields.password, { type: "password" })}
                id="password"
                name="password"
                type="password"
                placeholder="************"
                autoComplete="current-password"
                required
              />
              {fields.password.errors?.map((error, key) => (
                <div
                  key={`${key} | ${error}`}
                  className="text-destructive text-sm"
                >
                  {error}
                </div>
              ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="verifyPassword">Verify password</Label>
              <Input
                {...getInputProps(fields.verifyPassword, { type: "password" })}
                id="verifyPassword"
                name="verifyPassword"
                type="password"
                placeholder="************"
                autoComplete="current-password"
                required
              />
              {fields.verifyPassword.errors?.map((error, key) => (
                <div
                  key={`${key} | ${error}`}
                  className="text-destructive text-sm"
                >
                  {error}
                </div>
              ))}
            </div>
            {form.errors?.map((error, key) => (
              <div
                key={`${key} | ${error}`}
                className="text-destructive text-sm"
              >
                {error}
              </div>
            ))}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}