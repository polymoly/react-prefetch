import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { MouseEvent } from "react";

export interface PrefetchLinkProps extends LinkProps {
  onPrefetch: () => void;
}

export const PrefetchLink = ({
  onPrefetch,
  children,
  ...rest
}: PrefetchLinkProps) => {
  const onLinkClick = (e: MouseEvent) => {
    e.preventDefault();
    onPrefetch();
  };

  return (
    <Link onClick={onLinkClick} {...rest}>
      {children}
    </Link>
  );
};
