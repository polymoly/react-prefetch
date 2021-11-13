import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  SetStateAction,
  Dispatch,
  useMemo,
} from "react";
import {
  CreatePrefetchProviderResponse,
  GeneratePrefetches,
  Prefetch,
  PrefetchKey,
  PrefetchProviderProps,
} from "./types";
import { usePrefetch } from "./usePrefetch";
import { QueryKey, UseQueryOptions } from "react-query";

export function createPrefetchProvider<
  T extends Record<PrefetchKey, Prefetch<any>>,
>(prefetches: T): CreatePrefetchProviderResponse<T> {
  const InternalContext = createContext<{
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    onProgress: (loaded: number) => void;
  }>(undefined as any);
  const LoadingContext = createContext<{
    isLoading?: boolean;
    progress: number;
  }>(undefined as any);

  const useHooks = Object.fromEntries(
    Object.entries(prefetches || {}).map(([key, value]) => {
      return [
        `use${key[0].toUpperCase() + key.slice(1)}`,
        (
          options?: Omit<
            UseQueryOptions<any, "prefetch-query", any, QueryKey>,
            "queryFn" | "cacheTime" | "enabled"
          >,
        ) => {
          const { setIsLoading, onProgress } = useInternalContext();
          const { isLoading, ...rest } = usePrefetch(
            value,
            onProgress,
            options,
          );

          useLayoutEffect(() => {
            setIsLoading(Boolean(isLoading));

            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [isLoading]);

          return { isLoading, ...rest };
        },
      ] as const;
    }),
  ) as GeneratePrefetches<T>;

  const useInternalContext = () => {
    const values = useContext(InternalContext);

    return values;
  };
  const useLoadingContext = () => {
    return useContext(LoadingContext);
  };

  function Provider({ children }: PrefetchProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const internalValue = useMemo(() => {
      const onProgress = (loaded: number) => {
        setProgress((pre) => pre + loaded);
      };

      return { onProgress, setIsLoading };
    }, []);

    const loadingValue = useMemo(() => {
      return { isLoading, progress };
    }, [isLoading, progress]);

    return (
      <InternalContext.Provider value={internalValue}>
        <LoadingContext.Provider value={loadingValue}>
          {children}
        </LoadingContext.Provider>
      </InternalContext.Provider>
    );
  }

  return {
    Provider,
    useLoadingContext,
    ...useHooks,
  };
}
