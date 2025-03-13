import type { HeadersArgs } from "react-router";

function appendHeaders(a: Headers, b: Headers) {
  for (const [name, value] of b.entries()) {
    a.append(name, value);
  }
  for (const cookie of b.getSetCookie()) {
    a.append("Set-Cookie", cookie);
  }
}

export const appendRouteHeaders = ({
  parentHeaders,
  loaderHeaders,
  actionHeaders,
}: HeadersArgs) => {
  const headers = new Headers();

  appendHeaders(headers, parentHeaders);
  appendHeaders(headers, loaderHeaders);
  appendHeaders(headers, actionHeaders);

  return headers;
};

export function getRequestOrigin(request: Request) {
  const protocol =
    request.headers.get("X-Forwarded-Proto")?.split(", ")?.at(-1) ?? "http";

  const host =
    request.headers.get("X-Forwarded-Host")?.split(", ")?.at(-1) ??
    request.headers.get("host") ??
    new URL(request.url).host;

  return `${protocol}://${host}`;
}
