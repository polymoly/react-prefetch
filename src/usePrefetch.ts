import { useMutation } from "react-query";
import { useRef } from "react";
import { Prefetch, GetPrefetchVariable, PrefetchResponse } from "./types";

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
