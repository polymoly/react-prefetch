import React from "react";
import { useGetUsers } from "../../core/service/hooks";
import useStyles from "./style";
import { client } from "../../appProvider";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { createPrefetch } from "../../../../../src";
import { useAccountPrefetch } from "../../App";
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

const UserComp = ({ id, email, name, status }: User) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { prefetch, isLoading } = useAccountPrefetch();

  return (
    <div
      onClick={() => prefetch({ navigate, userId: `${id}` })}
      className={classes.card}
    >
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
  async (variables?: { navigate: NavigateFunction }) => {
    const useGetUsersPrefetch = useGetUsers.prefetch(client);

    const promises = [useGetUsersPrefetch];

    return {
      promises,
      onSuccess: () => variables?.navigate("/users"),
    };
  },
);
Users.prefetch = prefetch;

export { Users };
