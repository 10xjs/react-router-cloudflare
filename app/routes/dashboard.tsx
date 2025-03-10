import { Form, redirect } from "react-router";

import { Button } from "~/components/ui/button";
import { requireUser, setUserId } from "~/lib/session";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function action() {
  setUserId(undefined);
  throw redirect("/");
}

export function loader() {
  requireUser();
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