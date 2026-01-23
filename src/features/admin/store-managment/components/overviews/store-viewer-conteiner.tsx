import { ReactNode } from "react";

interface IStoreViewerContainerProps {
  children: ReactNode;
}

export const StoreViewerContainer = ({ children }: IStoreViewerContainerProps) => {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border border-gray-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};
