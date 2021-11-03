import React from "react";
import { useGetUsers } from "../../core/service/hooks";
import useStyles from "./style";
import { client } from "../../appProvider";
import { useHistory } from "react-router-dom";
import { createPrefetch } from "../../../../../src";
import { useHooks } from "../../App";
import { User } from "../../core/service/types";

const Users = () => {
  const classes = useStyles();
  const { data: { data } = {}, isLoading } = useGetUsers();

  return isLoading ? (
    <h1>loading... </h1>
  ) : (
    <div className={classes.container}>
      {data?.map(({ id, email, name, status }) => (
        <UserComp key={id} {...{ id, email, name, status }} />
      ))}
    </div>
  );
};

const UserComp = ({ email, name, status }: User) => {
  const classes = useStyles();
  const { prefetch, isLoading } = useHooks.accountPrefetch();
  const history = useHistory();

  return (
    <div onClick={() => prefetch({ history })} className={classes.card}>
      {isLoading ? (
        <h1>loading... </h1>
      ) : (
        <>
          <span>{name}</span>
          <span>{email}</span>
          <span>status: {status}</span>
        </>
      )}
    </div>
  );
};

const prefetch = createPrefetch(
  async (variables?: {
    history: ReturnType<typeof useHistory>;
    userId?: string;
  }) => {
    const useGetUsersPrefetch = useGetUsers.prefetch(client);

    const promises = [useGetUsersPrefetch];

    return {
      promises,
      onSuccess: () => variables?.history.push("/users"),
    };
  },
);
Users.prefetch = prefetch;

export { Users };
