import { useMutation } from "react-query";
import { useRef } from "react";
import { Prefetch } from "./types";

export type ProgressType = (loaded: number) => void;

type GetPrefetchVariable<T extends Prefetch<any>> = T extends Prefetch<infer U>
  ? U
  : never;

export type PrefetchResponse<T extends Prefetch<any>> = {
  prefetch: (
    variables?: GetPrefetchVariable<T>,
  ) => Promise<GetPrefetchVariable<T> | undefined>;
  error?: unknown;
  isLoading?: boolean;
  variables?: GetPrefetchVariable<T>;
};

export const usePrefetch = <T extends Prefetch<any>>(
  prefetching: T,
  onProgress: (prog: number) => void,
): PrefetchResponse<T> => {
  const variableRef = useRef<GetPrefetchVariable<T> | undefined>();
  const { isLoading, error, mutateAsync } = useMutation(
    async (_variables?: GetPrefetchVariable<T>) => {
      await prefetching({ onProgress, variables: _variables });
      return _variables;
    },
  );
  return {
    prefetch: (_variables) => {
      variableRef.current = _variables;
      return mutateAsync(_variables);
    },
    error,
    isLoading,
    variables: variableRef.current,
  };
};
