import { QueryClientProvider } from "@tanstack/react-query";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";

// Reject all pending promises from handler functions after 5 seconds
const STREAM_TIMEOUT = 5_000;

// https://github.com/jacob-ebey/react-router-cloudflare/blob/main/app/entry.server.tsx
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const controller = new AbortController();
  // Abort the streaming render pass after 6 seconds to allow the rejected
  // boundaries to be flushed
  setTimeout(() => controller.abort(), STREAM_TIMEOUT + 1000);

  const body = await renderToReadableStream(
    <QueryClientProvider client={loadContext.queryClient}>
      <ServerRouter context={routerContext} url={request.url} />
    </QueryClientProvider>,
    {
      signal: controller.signal,
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

// export function handleError(
//   error: unknown,
//   {
//     request,
//     params,
//     context,
//   }: LoaderFunctionArgs<AppLoadContext> | ActionFunctionArgs<AppLoadContext>
// ) {
//   if (!request.signal.aborted) {
//     sendErrorToErrorReportingService(error);
//     console.error(formatErrorForJsonLogging(error));
//   }
// }
