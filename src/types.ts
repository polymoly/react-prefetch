import { ReactNode } from "react";

export type Prefetch<TVariable extends any> = (options: {
  onProgress?: ProgressType;
  variables?: TVariable;
}) => Promise<void>;

export interface PrefetchProviderProps {
  children: ReactNode;
}
export type PrefetchKey = string;

type GetString<T> = T extends string ? T : never;

export type Progress = React.Dispatch<React.SetStateAction<number>>;

export type GeneratePrefetches<T extends Record<PrefetchKey, Prefetch<any>>> = {
  [P in keyof T as `use${Capitalize<GetString<P>>}`]: () => PrefetchResponse<
    T[P]
  >;
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
