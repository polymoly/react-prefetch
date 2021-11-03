import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Prefetch } from "./types";

export type ProgressType = (loaded: number) => void;

export type Entries = {
  entry?: string;
  persistKey?: string;
};

export type PrefetchResponse<T extends Prefetch<any>> = {
  prefetch: (variables?: Parameters<T>[0]["variables"]) => void;
  error?: unknown;
  isLoading?: boolean;
  variables?: Parameters<T>[0]["variables"];
};

export const usePrefetch = <T extends Prefetch<any>>(
  prefetching: T,
  onProgress: (prog: number) => void,
): PrefetchResponse<T> => {
  const history = useHistory();

  const { isLoading, error, mutate, data } = useMutation(
    async (variables?: Parameters<T>[0]["variables"]) => {
      await prefetching({ history, onProgress, variables });
      return variables;
    },
  );

  return {
    prefetch: (variables?: Parameters<T>[0]["variables"]) => mutate(variables),
    error,
    isLoading,
    variables: data,
  };
};
