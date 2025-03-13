import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/sign-up";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({ context }: Route.LoaderArgs) => {
  if (context.c.get("user")) {
    throw redirect("/dashboard");
  }
};

export default function SignUp({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Get started</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form action="/sign-in" method="post" className="grid gap-4">
            <input type="hidden" name="next" value="/dashboard" />
            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
              name="provider"
              value="google"
            >
              Continue with Google
            </Button>
          </Form>
          <div className="mt-4 text-center text-sm">
            Have an account?{" "}
            <Link to="/sign-in" className="underline">
              Sign In Now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
