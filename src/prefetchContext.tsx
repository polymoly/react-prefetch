import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  SetStateAction,
  Dispatch,
} from "react";
import {
  CreatePrefetchProviderResponse,
  GeneratePrefetches,
  Prefetch,
  PrefetchKey,
  PrefetchProviderProps,
  Progress,
  ProgressbarProps,
} from "./types";
import { usePrefetch } from "./usePrefetch";
import { View } from "plus-base-component";
import useStyles from "./style";

export function createPrefetchProvider<
  T extends Record<PrefetchKey, Prefetch<any>>,
>(prefetches: T): CreatePrefetchProviderResponse<T> {
  const InternalContext = createContext<{
    isLoading?: boolean;
    setOnProgress: (progressFn?: Progress) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    onProgress: (loaded: number) => void;
  }>(undefined as any);

  const useHooks = Object.fromEntries(
    Object.entries(prefetches || {}).map(([key, value]) => {
      return [
        `use${key[0].toUpperCase() + key.slice(1)}`,
        () => {
          const { setIsLoading, onProgress } = useInternalContext();
          const { isLoading, ...rest } = usePrefetch(value, onProgress);

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

  function Provider({ children }: PrefetchProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const onProgressRef = useRef<Progress>();

    const onProgress = (loaded: number) => {
      onProgressRef.current?.((pre) => pre + loaded);
    };
    const setOnProgress = (progressFn?: Progress) => {
      onProgressRef.current = progressFn;
    };

    return (
      <InternalContext.Provider
        value={{ setOnProgress, isLoading, onProgress, setIsLoading }}
      >
        {children}
      </InternalContext.Provider>
    );
  }

  const Progressbar = ({
    color = "#27c26c",
    thickness = 3,
  }: ProgressbarProps) => {
    const classes = useStyles({ color, thickness } as any);
    const [progressPercent, setProgressPercent] = useState<number>(0);

    const { isLoading, setOnProgress } = useInternalContext();

    useEffect(() => {
      setOnProgress(setProgressPercent);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <View
        className={classes.progress}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: `${isLoading ? progressPercent || 10 : 0}%`,
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
    ...useHooks,
  };
}
