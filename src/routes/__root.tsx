import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BagProvider } from "../lib/bag";
import { BagDrawer } from "../components/BagDrawer";
import { ArchivalPlayer } from "../components/ArchivalPlayer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="mono-meta text-primary">ERR / NO PRESSING FOUND</p>
        <h1 className="display mt-3 text-7xl">404</h1>
        <p className="mono-meta mt-3 text-muted-foreground">
          THIS SLEEVE IS EMPTY OR HAS BEEN FILED ELSEWHERE.
        </p>
        <Link to="/" className="label-sans mt-6 inline-block bg-primary px-4 py-2 text-primary-foreground">
          BACK TO AN-001
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-4xl">This page didn't load</h1>
        <p className="mono-meta mt-3 text-muted-foreground">TAPE DAMAGED. TRY AGAIN.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label-sans bg-primary px-4 py-2 text-primary-foreground"
          >
            TRY AGAIN
          </button>
          <a href="/" className="label-sans border border-border px-4 py-2">
            GO HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ARC NOIRE — OFF THE RECORD / AN-001" },
      {
        name: "description",
        content:
          "ARC NOIRE FALL 2026. OFF THE RECORD, catalog no. AN-001. Six tracks across Side A and Side B.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#141416" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BagProvider>
        <Outlet />
        <BagDrawer />
        <ArchivalPlayer />
      </BagProvider>
    </QueryClientProvider>
  );
}
