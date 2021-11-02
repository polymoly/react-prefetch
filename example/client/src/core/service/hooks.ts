/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 5
 */

import { useMemo } from "react";
import { AxiosRequestConfig } from "axios";
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryClient,
} from "react-query";
import { RequestError, SwaggerResponse } from "./config";
import { paginationFlattenData, getPageSize, getTotal } from "./hooksConfig";
import { User } from "./types";
import { getUsers } from "./services";

const useHasMore = (
  pages: Array<SwaggerResponse<any>> | undefined,
  list: any,
  queryParams: any,
) =>
  useMemo(() => {
    if (!pages || (pages && pages.length < 1)) {
      return false;
    }

    const total = getTotal(pages);

    if (total !== undefined) {
      if (list && list.length < total) {
        return true;
      }
      return false;
    }
    if (
      paginationFlattenData([pages[pages.length - 1]])?.length ===
      getPageSize(queryParams as any)
    ) {
      return true;
    }

    return false;
  }, [pages, list, queryParams]);

export const useGetUsers = (
  options?: UseQueryOptions<SwaggerResponse<User[]>, RequestError | Error>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUsers.info(options, configOverride);
  return useQuery<SwaggerResponse<User[]>, RequestError | Error>(
    key,
    () => fun(),
    options,
  );
};
useGetUsers.info = (
  options?: UseQueryOptions<SwaggerResponse<User[]>, RequestError | Error>,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getUsers.key],
    fun: () => getUsers(configOverride),
  };
};
useGetUsers.prefetch = (
  client: QueryClient,
  options?: UseQueryOptions<SwaggerResponse<User[]>, RequestError | Error>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUsers.info(options, configOverride);

  return client.getQueryData([getUsers.key])
    ? Promise.resolve()
    : client.prefetchQuery(key, () => fun(), options);
};
