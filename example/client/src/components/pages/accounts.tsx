import { useGetAccounts } from "../../core/service/hooks";
import useStyles from "./style";
import { client } from "../../appProvider";
import { NavigateFunction } from "react-router-dom";
import { createPrefetch } from "../../../../../src";
import { Routes } from "../../core/routes";

const Accounts = () => {
  const classes = useStyles();
  const { userId } = Routes.Accounts.useQueryParams();
  const { data: { data } = {}, isLoading } = useGetAccounts(
    { userId },
    {
      staleTime: 1000,
    },
  );

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
  async (variables?: { navigate: NavigateFunction; userId?: string }) => {
    const useGetUsersPrefetch = useGetAccounts.prefetch(client, {
      userId: variables?.userId,
    });
    return {
      promises: [useGetUsersPrefetch],
      onSuccess: () =>
        variables?.navigate(
          Routes.Accounts.create({ query: { userId: variables?.userId } }),
        ),
    };
  },
);
Accounts.prefetch = prefetch;

export { Accounts };
