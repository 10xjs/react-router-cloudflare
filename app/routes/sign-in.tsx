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
import { getRequestOrigin } from "~/lib/headers";
import type { Route } from "./+types/sign-in";

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

export const formSchema = z.object({
  provider: z.enum(["google"]),
  next: z.string().optional(),
});

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { provider } = submission.value;

  const auth = context.c.get("auth");

  const origin = getRequestOrigin(request);

  const redirectToUrl = new URL(`${origin}/auth/callback`);
  redirectToUrl.searchParams.set("next", submission.value.next ?? "/");

  const result = await auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectToUrl.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (result.error) {
    const params = new URLSearchParams();
    if (result.error.code) {
      params.set("code", result.error.code);
    }
    if (result.error.message) {
      params.set("message", result.error.message);
    }
    throw redirect(`/auth/error?${params.toString()}`);
  }

  return redirect(result.data.url);
}

export default function SignIn({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
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
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign Up Now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
