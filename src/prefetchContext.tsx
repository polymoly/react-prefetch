import React from "react";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import {
  GeneratePrefetches,
  Prefetch,
  PrefetchKey,
  PrefetchProviderProps,
  Progress,
} from "./types";
import { usePrefetch } from "./usePrefetch";
import { View } from "plus-base-component";
import useStyles from "./style";

export function createPrefetchProvider<
  T extends Record<PrefetchKey, Prefetch<any>>,
  U extends any,
>(prefetches: T) {
  const PrefetchFnContext = createContext<GeneratePrefetches<T, U>>({} as any);

  const InternalContext = createContext<{
    isLoading?: boolean;
    setOnProgress: (progressFn?: Progress) => void;
  }>({ isLoading: false, setOnProgress: () => null });

  const generatePrefetches = (fn: (loaded: number) => void) => {
    return Object.entries(prefetches || {}).map(([key, value]) => {
      return [key, usePrefetch(value, fn)] as const;
    });
  };

  const usePrefetches = () => {
    const values = useContext(PrefetchFnContext);

    return values;
  };
  const useInternalContext = () => {
    const values = useContext(InternalContext);

    return values;
  };

  function Provider({ children }: PrefetchProviderProps) {
    const onProgressRef = useRef<Progress>();

    const onProgress = (loaded: number) => {
      onProgressRef.current?.((pre) => pre + loaded);
    };
    const setOnProgress = (progressFn?: Progress) => {
      onProgressRef.current = progressFn;
    };

    const prefetchObjects = generatePrefetches(onProgress);

    const loadingArray = prefetchObjects.map(([, { isLoading }]) => {
      return isLoading;
    });

    const isLoading = loadingArray.reduce((p, q) => p || q, false);

    return (
      <InternalContext.Provider value={{ setOnProgress, isLoading }}>
        <PrefetchFnContext.Provider
          value={
            Object.fromEntries(
              prefetchObjects.map(([key, value]) => [key, value.prefetch]),
            ) as GeneratePrefetches<T, U>
          }
        >
          {children}
        </PrefetchFnContext.Provider>
      </InternalContext.Provider>
    );
  }

  const Progressbar = () => {
    const classes = useStyles();
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
    usePrefetches,
  };
}
