"use client";

import { ReactElement } from "react";

interface IGenericItemsCardProps {
  children: ReactElement;
}

export const GenericItemsCard = ({ children }: IGenericItemsCardProps) => {
  return <div className="p-0 mb-0.5 mt-1">{children}</div>;
};
