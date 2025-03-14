import { useQuery } from "@tanstack/react-query";
import { Form, Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { partialDehydrate, withHydrationBoundary } from "~/lib/tanstack-query";
import { authUserQuery } from "~/queries/auth";
import type { Route } from "./+types/dashboard";

// import { requireUser, setUserId } from "~/lib/session";

export function meta() {
  return [
    { title: "Dashboard - React Router Cloudflare" },
    {
      name: "description",
      content:
        "Manage your application with the React Router Cloudflare dashboard",
    },
  ];
}

export async function action({ context }: Route.ActionArgs) {
  const auth = context.c.get("auth");
  await auth.signOut({ scope: "local" });
  throw redirect("/");
}

interface Stats {
  deployments: number;
  traffic: string;
  errors: number;
  uptime: string;
}

interface Activity {
  id: number;
  event: string;
  time: string;
  status: "success" | "info" | "warning";
}

interface Project {
  id: number;
  name: string;
  status: string;
  url: string;
  lastDeployed: string;
}

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.c.get("user");

  if (!user) {
    const searchParams = new URLSearchParams();
    searchParams.set("next", "/dashboard");
    throw redirect(`/sign-in?${searchParams.toString()}`);
  }

  await context.queryClient.ensureQueryData({
    ...authUserQuery(),
    queryFn: () => {
      return user;
    },
  });

  await context.queryClient.ensureQueryData<Stats>({
    queryKey: ["stats"],
    queryFn: () => {
      return {
        deployments: 12,
        traffic: "2.4GB",
        errors: 2,
        uptime: "99.9%",
      };
    },
  });

  await context.queryClient.ensureQueryData<Activity[]>({
    queryKey: ["recentActivity"],
    queryFn: () => {
      return [
        {
          id: 1,
          event: "Deployment successful",
          time: "10 minutes ago",
          status: "success",
        },
        {
          id: 2,
          event: "Configuration updated",
          time: "2 hours ago",
          status: "info",
        },
        {
          id: 3,
          event: "New user sign-up",
          time: "5 hours ago",
          status: "info",
        },
        {
          id: 4,
          event: "API rate limit reached",
          time: "1 day ago",
          status: "warning",
        },
      ];
    },
  });

  await context.queryClient.ensureQueryData<Project[]>({
    queryKey: ["projects"],
    queryFn: () => {
      return [
        {
          id: 1,
          name: "Marketing Website",
          status: "Live",
          url: "https://example.com",
          lastDeployed: "2 hours ago",
        },
        {
          id: 2,
          name: "E-commerce Platform",
          status: "Live",
          url: "https://store.example.com",
          lastDeployed: "1 day ago",
        },
        {
          id: 3,
          name: "Admin Dashboard",
          status: "Development",
          url: "https://dev.example.com",
          lastDeployed: "5 hours ago",
        },
      ];
    },
  });

  return {
    dehydratedState: partialDehydrate(context.queryClient),
  };
}

export default withHydrationBoundary(function Dashboard(
  _props: Route.ComponentProps
) {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: () => {
      throw new Error("Not implemented");
    },
    enabled: false,
  });

  const { data: recentActivity } = useQuery<Activity[]>({
    queryKey: ["recentActivity"],
    queryFn: () => {
      throw new Error("Not implemented");
    },
    enabled: false,
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => {
      throw new Error("Not implemented");
    },
    enabled: false,
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-white dark:bg-gray-800">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-600"
              >
                <title>React Router Cloudflare Logo</title>
                <path d="M12 2 L2 7 L12 12 L22 7 L12 2" />
                <path d="M2 17 L12 22 L22 17" />
                <path d="M2 12 L12 17 L22 12" />
              </svg>
              <span className="text-lg font-semibold">React Router CF</span>
            </div>
          </div>
          <div className="flex flex-col flex-grow px-4 mt-5">
            <nav className="flex-1 space-y-1 bg-white dark:bg-gray-800">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400"
                >
                  <title>Dashboard Icon</title>
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                Dashboard
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-2 mt-1 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400"
                >
                  <title>Projects Icon</title>
                  <path d="M12 5V3" />
                  <path d="M5 8h14" />
                  <path d="M5.8 8v10c0 .6.4 1 1 1h10.4c.6 0 1-.4 1-1V8" />
                  <path d="M4 20h16" />
                </svg>
                Projects
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-2 mt-1 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400"
                >
                  <title>Analytics Icon</title>
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                Analytics
              </Link>
              <Link
                to="#"
                className="flex items-center px-4 py-2 mt-1 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400"
                >
                  <title>Settings Icon</title>
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 border-t">
            <Form method="post" className="flex-shrink-0 w-full group block">
              <Button
                type="submit"
                variant="outline"
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-3"
                >
                  <title>Logout Icon</title>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </Button>
            </Form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="z-10 py-4 bg-white shadow-sm dark:bg-gray-800 md:hidden">
          <div className="container flex items-center justify-between h-full px-6 mx-auto">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-blue-600 mr-3"
              >
                <title>React Router Cloudflare Logo</title>
                <path d="M12 2 L2 7 L12 12 L22 7 L12 2" />
                <path d="M2 17 L12 22 L22 17" />
                <path d="M2 12 L12 17 L22 12" />
              </svg>
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
            <Form method="post">
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </Form>
          </div>
        </header>

        {/* Main content */}
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto py-8">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Dashboard
            </h1>

            {/* Stats Section */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {/* Deployment Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Deployments
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-blue-600"
                  >
                    <title>Deployments Icon</title>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.deployments}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>

              {/* Traffic Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Traffic
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-blue-600"
                  >
                    <title>Traffic Icon</title>
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.traffic}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              {/* Error Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Errors</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-red-600"
                  >
                    <title>Errors Icon</title>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.errors}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    -3 from last week
                  </p>
                </CardContent>
              </Card>

              {/* Uptime Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-600"
                  >
                    <title>Uptime Icon</title>
                    <path d="M12 2v4" />
                    <path d="m6.34 6.34-2.83-2.83" />
                    <path d="M2 12h4" />
                    <path d="m6.34 17.66-2.83 2.83" />
                    <path d="M12 22v-4" />
                    <path d="m17.66 17.66 2.83 2.83" />
                    <path d="M22 12h-4" />
                    <path d="m17.66 6.34 2.83-2.83" />
                    <path d="M12 6v6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.uptime}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +0.1% from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Projects Section */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Your Projects
            </h2>
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>
                    Manage your deployed applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                          <th className="px-4 py-3">Project</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">URL</th>
                          <th className="px-4 py-3">Last Deployed</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {projects?.map((project) => (
                          <tr
                            key={project.id}
                            className="text-gray-700 dark:text-gray-400"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div>
                                  <p className="font-semibold">
                                    {project.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                  project.status === "Live"
                                    ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                                    : "text-orange-700 bg-orange-100 dark:bg-orange-600 dark:text-orange-100"
                                }`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <a
                                href={project.url}
                                className="text-blue-600 hover:underline"
                              >
                                {project.url}
                              </a>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {project.lastDeployed}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Redeploy
                                </Button>
                                <Button variant="outline" size="sm">
                                  Settings
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent deployment activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity?.map((activity) => (
                      <div key={activity.id} className="flex">
                        <div
                          className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
                            activity.status === "success"
                              ? "bg-green-100 dark:bg-green-800"
                              : activity.status === "warning"
                                ? "bg-yellow-100 dark:bg-yellow-800"
                                : "bg-blue-100 dark:bg-blue-800"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`h-5 w-5 ${
                              activity.status === "success"
                                ? "text-green-600 dark:text-green-300"
                                : activity.status === "warning"
                                  ? "text-yellow-600 dark:text-yellow-300"
                                  : "text-blue-600 dark:text-blue-300"
                            }`}
                          >
                            <title>
                              {activity.status === "success"
                                ? "Success Icon"
                                : activity.status === "warning"
                                  ? "Warning Icon"
                                  : "Info Icon"}
                            </title>
                            {activity.status === "success" ? (
                              <>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </>
                            ) : activity.status === "warning" ? (
                              <>
                                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                              </>
                            ) : (
                              <>
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                              </>
                            )}
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {activity.event}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks you can perform
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <title>Deploy Icon</title>
                        <path d="M13 5c2.431 0 4 1.568 4 4 0 .874-.308 1.75-.94 2.5M12 15v3.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5V13.5" />
                        <path d="M7.2 6.2c-.6.6-1.2 1.4-1.2 2.4 0 2.432 1.568 4 4 4s3-1.5 5-4c0 0-1 3-3.5 5.5M16 3l-2 2" />
                        <path d="M7 12H3.5a3.5 3.5 0 0 0 0 7h3" />
                      </svg>
                      New Deploy
                    </Button>
                    <Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <title>Add Project Icon</title>
                        <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8h-3" />
                        <path d="M17 3v5h5" />
                        <path d="M12 17v-6" />
                        <path d="M9 14h6" />
                      </svg>
                      Add Project
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor="search">Quick Search</Label>
                    <div className="flex w-full max-w-sm items-center mt-1.5">
                      <Input
                        type="search"
                        id="search"
                        placeholder="Search projects..."
                        className="flex-1"
                      />
                      <Button className="ml-2">Search</Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="invite">Invite Team Member</Label>
                    <div className="flex w-full max-w-sm items-center space-x-2 mt-1.5">
                      <Input
                        type="email"
                        id="invite"
                        placeholder="Email address"
                        className="flex-1"
                      />
                      <Button>Invite</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});
