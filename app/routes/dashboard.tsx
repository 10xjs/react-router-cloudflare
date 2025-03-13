import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/dashboard";

// import { requireUser, setUserId } from "~/lib/session";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ context }: Route.ActionArgs) {
  const auth = context.c.get("auth");
  await auth.signOut();
  throw redirect("/sign-in");
}

export function loader({ context }: Route.LoaderArgs) {
  const user = context.c.get("user");
  console.log(user);
  if (!user) {
    throw redirect("/sign-in");
  }
}

export default function Dashboard() {
  return (
    <main className="container px-4 py-16 mx-auto w-full">
      <h1>Dashboard</h1>
      <Form method="post">
        <Button type="submit">Logout</Button>
      </Form>
    </main>
  );
}
