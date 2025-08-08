import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface IMethodsBtns {
  children: ReactNode;
  selectedType: "search" | "create" | "update" | "delete" | "secondary";
  variant?: "default" | "secondary";
  isDisabled?: boolean;
  onClickAct?: () => void;
  extraClassName: string;
}

export default function MethodsBtns({
  children,
  selectedType,
  variant = "default",
  isDisabled,
  onClickAct,
  extraClassName,
}: IMethodsBtns) {
  const btnTypeMap = {
    search: "bg-method-get text-white hover:bg-method-get/80",
    create: "bg-method-post text-neutral-700 hover:bg-method-post/80",
    update: "bg-method-put text-white hover:bg-method-put/80",
    delete: "bg-method-delete text-white hover:bg-method-delete/80",
    secondary: "bg-gray-300 text-black hover:bg-gray-300/80",
  };
  const btnType = btnTypeMap[selectedType] ?? "";

  return (
    <Button
      type="submit"
      variant={variant}
      color="primary"
      disabled={isDisabled}
      onClick={onClickAct}
      className={`${btnType} sm:max-w-80 m-auto font-bold cursor-pointer ${extraClassName}`}
    >
      {children}
    </Button>
  );
}
