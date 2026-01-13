import React from "react";

interface IItemsCards {
  children: React.ReactNode;
}

export const ItemCard = ({ children }: IItemsCards) => {
  return <div>{children}</div>;
};
