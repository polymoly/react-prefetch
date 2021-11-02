import React from "react";
import { useGetUsers } from "../../core/service/hooks";
import { createPrefetch } from "prefetch-rendering";
import useStyles from "./style";
import { client } from "../../appProvider";
import { useHistory } from "react-router-dom";

const Users = () => {
  const classes = useStyles();
  const { data: { data } = {}, isLoading } = useGetUsers();

  return isLoading ? (
    <h1>loading ...</h1>
  ) : (
    <div className={classes.container}>
      {data?.map(({ id, email, name, status }) => (
        <div key={id} className={classes.card}>
          <span>{name}</span>
          <span>{email}</span>
          <span>status :{status}</span>
        </div>
      ))}
    </div>
  );
};

const prefetch = createPrefetch(async () => {
  const useGetUsersPrefetch = useGetUsers.prefetch(client);

  const promises = [useGetUsersPrefetch];

  return {
    promises,
    onSuccess: (variables?: { history: ReturnType<typeof useHistory> }) =>
      variables?.history.push("/users"),
  };
});
Users.prefetch = prefetch;

export { Users };
