import { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { ProgressType } from "./usePrefetch";

export type Prefetch<T extends any> = (options: {
  history: ReturnType<typeof useHistory>;
  onProgress?: ProgressType;
  variables?: T;
}) => Promise<void>;

export interface PrefetchProviderProps {
  children: ReactNode;
}
export type PrefetchKey = string | number | symbol;

export type Progress = React.Dispatch<React.SetStateAction<number>>;

export type GeneratePrefetches<T, U> = {
  [P in keyof T]: (variable?: U) => void;
};
