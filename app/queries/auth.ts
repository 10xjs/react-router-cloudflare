import { queryOptions, useQuery } from "@tanstack/react-query";
import type { TokenPayload } from "~/lib/auth";

export const authUserQuery = () =>
  queryOptions<TokenPayload | null>({
    queryKey: ["auth-user"],
    // Rely entirely on the root loader to prefetch the data
    queryFn: () => {
      throw new Error("Not implemented");
    },
  });

export const useAuthUser = () => {
  return useQuery({
    ...authUserQuery(),
    enabled: false,
  });
};
