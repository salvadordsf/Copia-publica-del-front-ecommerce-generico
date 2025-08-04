"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetCategoryQuerySchema,
  IGetCategoryQuery,
} from "../../schemas/categories-schema";
import CategoryList from "./categories-list";

export default function CategorySearcher() {
  const [query, setQuery] = useState<IGetCategoryQuery>({
    name: "",
    subcategories: false,
    products: false,
  });

  const { handleSubmit, register } = useForm<IGetCategoryQuery>({
    resolver: zodResolver(GetCategoryQuerySchema),
    defaultValues: {
      name: "",
      subcategories: false,
      products: false,
    },
  });

  const onSubmit = (data: IGetCategoryQuery) => {
    setQuery(data);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-6 items-end justify-between"
      >
        <div className="flex items-end gap-2 flex-1 min-w-[250px]">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">Buscar por nombre</label>
            <Input {...register("name")} placeholder="Ej: ropa, navidad..." />
          </div>
          <Button
            type="submit"
            className="cursor-pointer bg-method-get hover:bg-method-get/90"
          >
            <Search />
          </Button>
        </div>
      </form>

      <CategoryList query={query} />
    </div>
  );
}
