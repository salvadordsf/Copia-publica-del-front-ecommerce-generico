"use client";

import { ReactElement } from "react";

interface IGenericItemsCardProps {
  children: ReactElement;
}

export const GenericItemsCard = ({ children }: IGenericItemsCardProps) => {
  return <div className="p-0">{children}</div>;
};
