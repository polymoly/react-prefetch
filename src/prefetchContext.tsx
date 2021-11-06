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
  ProgressbarProps,
} from "./types";
import { usePrefetch } from "./usePrefetch";
import { View } from "plus-base-component";
import useStyles from "./style";
import { UseMutationOptions } from "react-query";

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
        (options?: Omit<UseMutationOptions, "mutationFn">) => {
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
  /** @todo Should be removed */
  /** @deprecated */
  const Progressbar = ({
    color = "#27c26c",
    thickness = 3,
  }: ProgressbarProps) => {
    const classes = useStyles({ color, thickness } as any);

    const { isLoading, progress } = useLoadingContext();

    return (
      <View
        className={classes.progress}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: `${isLoading ? progress || 10 : 0}%`,
          transitionDuration: isLoading ? "1s" : undefined,
          transitionProperty: "width",
          transitionTimingFunction: "ease-out",
        }}
      />
    );
  };

  return {
    Provider,
    Progressbar,
    useLoadingContext,
    ...useHooks,
  };
}
