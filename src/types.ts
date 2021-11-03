import { ReactNode } from "react";
import { PrefetchResponse, ProgressType } from "./usePrefetch";

export type Prefetch<TVariable extends any> = (options: {
  onProgress?: ProgressType;
  variables?: TVariable;
}) => Promise<void>;

export interface PrefetchProviderProps {
  children: ReactNode;
}
export type PrefetchKey = string | number | symbol;

export type Progress = React.Dispatch<React.SetStateAction<number>>;

export type GeneratePrefetches<T extends Record<PrefetchKey, Prefetch<any>>> = {
  [P in keyof T]: PrefetchResponse<T[P]>;
};
