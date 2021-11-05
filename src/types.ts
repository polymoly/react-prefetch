import { ReactNode } from "react";
import { UseMutationOptions } from "react-query";

export type Prefetch<TVariable extends any> = (options: {
  onProgress?: ProgressType;
  variables?: TVariable;
}) => Promise<void>;

export interface PrefetchProviderProps {
  children: ReactNode;
}
export type PrefetchKey = string;

type GetString<T> = T extends string ? T : never;

export type GeneratePrefetches<T extends Record<PrefetchKey, Prefetch<any>>> = {
  [P in keyof T as `use${Capitalize<GetString<P>>}`]: (
    options?: Omit<
      UseMutationOptions<
        Parameters<T[P]>[0]["variables"],
        unknown,
        Parameters<T[P]>[0]["variables"]
      >,
      "mutationFn"
    >,
  ) => PrefetchResponse<T[P]>;
};

export type GetPrefetchVariable<T extends Prefetch<any>> = T extends Prefetch<
  infer U
>
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

export type ProgressType = (loaded: number) => void;

export interface ProgressbarProps {
  color?: string;
  thickness?: number;
}

export type CreatePrefetchProviderResponse<
  T extends Record<PrefetchKey, Prefetch<any>>,
> = {
  /** Should be wrap over pages */
  Provider: ({ children }: PrefetchProviderProps) => JSX.Element;
  Progressbar: (props: ProgressbarProps) => JSX.Element;
  useLoadingContext: () => {
    isLoading?: boolean | undefined;
    progress: number;
  };
} & GeneratePrefetches<T>;
