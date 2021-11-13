import { useRef } from "react";
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { GetPrefetchVariable, Prefetch, PrefetchResponse } from "./types";
import { v4 as uuid } from "uuid";

export const usePrefetch = <T extends Prefetch<any>>(
  prefetching: T,
  onProgress: (prog: number) => void,
  options?: Omit<
    UseQueryOptions<any, "prefetch-query", any, QueryKey>,
    "queryFn" | "cacheTime" | "enabled"
  >,
): PrefetchResponse<T> => {
  const client = useQueryClient();
  const uniqId = useRef(uuid());

  const variablesRef = useRef<GetPrefetchVariable<T>>();
  const { refetch, ...rest } = useQuery(
    ["__________prefetchquery" + uniqId.current] as QueryKey,
    () => prefetching({ onProgress, variables: variablesRef.current }),
    { ...options, cacheTime: 0, staleTime: Infinity, enabled: false },
  );

  return {
    prefetch: async (_variables) => {
      variablesRef.current = _variables;
      await client.cancelQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey)
            ? query.queryKey[0].startsWith("__________prefetchquery")
            : (query.queryKey as string).startsWith("__________prefetchquery"),
      });
      refetch();
    },
    variables: variablesRef.current,
    ...rest,
  };
};
