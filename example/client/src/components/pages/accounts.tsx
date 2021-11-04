import React from "react";
import { useGetAccounts } from "../../core/service/hooks";
import useStyles from "./style";
import { client } from "../../appProvider";
import { useHistory } from "react-router-dom";
import { createPrefetch } from "../../../../../src";
import { Routes } from "../../core/routes";

const Accounts = () => {
  const classes = useStyles();
  const { userId } = Routes.Accounts.useQueryParams();
  const { data: { data } = {}, isLoading } = useGetAccounts({ userId });

  return isLoading ? (
    <h1>loading ...</h1>
  ) : (
    <div className={classes.container}>
      {data?.map(({ id, name }) => (
        <div key={id} className={`${classes.card} ${classes.accountCard}`}>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

const prefetch = createPrefetch(
  async (variables?: {
    history: ReturnType<typeof useHistory>;
    userId?: string;
  }) => {
    const useGetUsersPrefetch = useGetAccounts.prefetch(client, {
      userId: variables?.userId,
    });

    return {
      promises: [useGetUsersPrefetch],
      onSuccess: () =>
        variables?.history.push(
          Routes.Accounts.create({ query: { userId: variables?.userId } }),
        ),
    };
  },
);
Accounts.prefetch = prefetch;

export { Accounts };