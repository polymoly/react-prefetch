import { useMutation, UseMutationOptions } from "react-query";
import { Prefetch, GetPrefetchVariable, PrefetchResponse } from "./types";

export const usePrefetch = <T extends Prefetch<any>>(
  prefetching: T,
  onProgress: (prog: number) => void,
  options?: Omit<
    UseMutationOptions<
      Parameters<T>[0]["variables"],
      unknown,
      Parameters<T>[0]["variables"]
    >,
    "mutationFn"
  >,
): PrefetchResponse<T> => {
  const { mutateAsync, ...rest } = useMutation(
    async (_variables?: GetPrefetchVariable<T>) => {
      await prefetching({ onProgress, variables: _variables });
      return _variables;
    },
    options,
  );
  return {
    prefetch: (_variables) => {
      return mutateAsync(_variables);
    },
    ...rest,
  };
};
