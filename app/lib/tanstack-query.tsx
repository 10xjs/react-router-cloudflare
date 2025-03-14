import {
  type DehydrateOptions,
  type DehydratedState,
  HydrationBoundary,
  type Query,
  type QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export function withHydrationBoundary<
  T extends { loaderData: { dehydratedState: DehydratedState } },
>(Component: React.ComponentType<T>) {
  const wrapped = (props: T) => (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <Component {...props} />
    </HydrationBoundary>
  );
  wrapped.displayName = `withHydrationBoundary(${Component.displayName || Component.name})`;
  return wrapped;
}

const cache = new WeakMap<QueryClient, Set<string>>();
function fingerprint(query: Query) {
  return `${query.queryHash}-${query.state.dataUpdateCount}-${query.state.errorUpdateCount}`;
}

export function partialDehydrate(
  client: QueryClient,
  options?: DehydrateOptions
) {
  let set = cache.get(client);
  if (!set) {
    set = new Set();
    cache.set(client, set);
  }

  return dehydrate(client, {
    shouldDehydrateQuery: (query) => {
      const print = fingerprint(query);
      const dehydrated = set.has(print);

      if (dehydrated) {
        return false;
      }

      set.add(print);

      return options?.shouldDehydrateQuery?.(query) ?? true;
    },
  });
}
