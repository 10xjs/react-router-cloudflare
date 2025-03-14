import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAuthUser } from "~/queries/auth";

export function meta() {
  return [
    { title: "React Router Cloudflare - Modern web application framework" },
    {
      name: "description",
      content:
        "Build incredible web applications with React Router Cloudflare - A modern framework for full-stack web development",
    },
  ];
}

export default function Index() {
  const { data: authUser } = useAuthUser();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-3 px-3 sm:px-4 sm:py-4 mx-auto">
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
            <span className="text-xl font-bold">React Router CF</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#features"
                    className={navigationMenuTriggerStyle()}
                  >
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#how-it-works"
                    className={navigationMenuTriggerStyle()}
                  >
                    How It Works
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                            href="https://github.com/10xjs/react-router-cloudflare"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Documentation
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Learn how to use React Router Cloudflare to build
                              modern web applications.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            href="https://github.com/10xjs/react-router-cloudflare"
                          >
                            <div className="text-sm font-medium leading-none">
                              Getting Started
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                              Quick setup guide for your first project
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            href="https://github.com/10xjs/react-router-cloudflare"
                          >
                            <div className="text-sm font-medium leading-none">
                              Examples
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                              Browse sample projects and code snippets
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            href="https://github.com/10xjs/react-router-cloudflare"
                          >
                            <div className="text-sm font-medium leading-none">
                              API Reference
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                              Full API documentation and guides
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="https://github.com/10xjs/react-router-cloudflare"
                    className={navigationMenuTriggerStyle()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <title>Menu Icon</title>
                      <line x1="4" x2="20" y1="12" y2="12" />
                      <line x1="4" x2="20" y1="6" y2="6" />
                      <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="px-3 py-3 sm:px-4 sm:py-4">
                  <SheetHeader className="p-2 sm:p-4">
                    <SheetTitle>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-blue-600"
                        >
                          <title>React Router Cloudflare Logo</title>
                          <path d="M12 2 L2 7 L12 12 L22 7 L12 2" />
                          <path d="M2 17 L12 22 L22 17" />
                          <path d="M2 12 L12 17 L22 12" />
                        </svg>
                        React Router CF
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 py-6 px-2 sm:px-4">
                    <SheetClose asChild>
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .querySelector("#features")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-base font-medium text-left text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors py-2"
                      >
                        Features
                      </button>
                    </SheetClose>
                    <SheetClose asChild>
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .querySelector("#how-it-works")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-base font-medium text-left text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors py-2"
                      >
                        How It Works
                      </button>
                    </SheetClose>
                    <Separator className="my-1" />
                    <SheetClose asChild>
                      <a
                        href="https://github.com/10xjs/react-router-cloudflare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors py-2"
                      >
                        Documentation
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="https://github.com/10xjs/react-router-cloudflare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors py-2"
                      >
                        GitHub
                      </a>
                    </SheetClose>
                    <Separator className="my-1" />
                    <div className="flex flex-col gap-3 pt-2 sm:pt-4">
                      {!authUser ? (
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/sign-in">Sign In</Link>
                          </Button>
                        </SheetClose>
                      ) : null}
                      <SheetClose asChild>
                        <Link to="/sign-up">
                          <Button className="w-full" asChild>
                            <Link to="/sign-up">Get Started</Link>
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {!authUser ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              ) : null}
              <Button size="sm" asChild>
                <Link to="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 py-16 md:py-24 mx-auto flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
            <span className="text-blue-600 font-medium">New</span> React Router
            v7 Integration
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
            Build incredible web applications with{" "}
            <span className="text-blue-600">React Router Cloudflare</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8 md:mb-10">
            A modern full-stack web framework leveraging React Router and
            Cloudflare's edge computing platform for blazing fast, globally
            distributed applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/sign-up" className="w-full sm:w-auto">
                Get Started
              </Link>
            </Button>
            <a
              href="https://github.com/10xjs/react-router-cloudflare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View on GitHub
              </Button>
            </a>
          </div>

          <div className="mt-10 md:mt-12 w-full max-w-md px-4 sm:px-0">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email for updates"
                className="pr-24 rounded-full"
              />
              <Button className="absolute right-0 top-0 rounded-l-none rounded-r-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20"
      >
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-10 md:mb-12 text-sm md:text-base">
            Everything you need to build modern web applications with React
            Router and Cloudflare's edge computing platform.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Card>
              <CardHeader>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    <title>Edge Computing Icon</title>
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                </div>
                <CardTitle>Edge Computing</CardTitle>
                <CardDescription>Deploy globally in seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Run your applications at the edge, closer to your users for
                  incredible performance and reliability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    <title>React Router Icon</title>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9" />
                    <path d="M12 2c-2.4 0-4.5 1.8-4.5 4.5S9.6 11 12 11" />
                    <path d="M12 22c2.4 0 4.5-1.8 4.5-4.5S14.4 13 12 13" />
                  </svg>
                </div>
                <CardTitle>React Router</CardTitle>
                <CardDescription>
                  Built on the latest v7 release
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Built on the latest React Router v7 to provide an intuitive
                  and powerful routing system.
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 md:col-span-1">
              <CardHeader>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    <title>Full-Stack Framework Icon</title>
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                  </svg>
                </div>
                <CardTitle>Full-Stack Framework</CardTitle>
                <CardDescription>
                  End-to-end application development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Everything you need to build complete web applications with
                  built-in authentication, data storage, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            How It Works
          </h2>
          <Tabs defaultValue="create" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="develop">Develop</TabsTrigger>
              <TabsTrigger value="deploy">Deploy</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>1. Create Your Project</CardTitle>
                  <CardDescription>
                    Get started quickly with pre-configured templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base">
                    Initialize a new project with the React Router Cloudflare
                    CLI and get started quickly with pre-configured templates.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm">
                    <code>npx create-react-router-cloudflare my-app</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="develop">
              <Card>
                <CardHeader>
                  <CardTitle>2. Develop Your Application</CardTitle>
                  <CardDescription>
                    Powerful developer experience with hot reloading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    Build your application using React Router's intuitive API
                    and powerful features like nested routes, loaders, and
                    actions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="deploy">
              <Card>
                <CardHeader>
                  <CardTitle>3. Deploy to Cloudflare</CardTitle>
                  <CardDescription>
                    One command for global deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    Deploy your application to Cloudflare's global network with
                    a single command for incredible performance and reliability.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Trusted by Developers
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Developer"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Jane Developer</CardTitle>
                    <CardDescription>Frontend Lead</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  "React Router Cloudflare has revolutionized how we build web
                  apps. The performance gains from edge computing are
                  incredible."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Developer"
                    />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Mark Coder</CardTitle>
                    <CardDescription>CTO, TechStart</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  "We migrated our entire stack to React Router Cloudflare and
                  saw a 50% improvement in global load times. Our users love
                  it!"
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 md:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Developer"
                    />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Sarah Programmer</CardTitle>
                    <CardDescription>Indie Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  "As a solo developer, React Router Cloudflare gives me
                  enterprise-level infrastructure with minimal configuration.
                  Game changer!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join the growing community of developers building the future of web
            applications with React Router Cloudflare.
          </p>
          <Link to="/sign-up">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
            >
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-blue-600"
              >
                <title>React Router Cloudflare Logo</title>
                <path d="M12 2 L2 7 L12 12 L22 7 L12 2" />
                <path d="M2 17 L12 22 L22 17" />
                <path d="M2 12 L12 17 L22 12" />
              </svg>
              <span className="text-sm font-semibold">
                React Router Cloudflare
              </span>
            </div>

            <div className="flex flex-col items-center md:flex-row md:space-x-6 space-y-6 md:space-y-0 mb-6 md:mb-0">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a
                  href="/docs"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="/blog"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Blog
                </a>
                <a
                  href="https://github.com/10xjs/react-router-cloudflare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-6"
              />
              <div className="flex gap-6">
                <a
                  href="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} React Router Cloudflare
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
