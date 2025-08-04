"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetTagQuerySchema, IGetTagQuery } from "../../schemas/tags-schema";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TagList from "./tags-list";

export default function TagSearcher() {
  const [query, setQuery] = useState<IGetTagQuery>({
    name: "",
    products: false,
  });
  const { handleSubmit, register } = useForm<IGetTagQuery>({
    resolver: zodResolver(GetTagQuerySchema),
    defaultValues: {
      name: "",
      products: false,
    },
  });

  const onSubmit = (data: IGetTagQuery) => {
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
          <Button type="submit" className="cursor-pointer bg-method-get hover:bg-method-get/90">
            <Search />
          </Button>
        </div>
      </form>

      <TagList query={query} />
    </div>
  );
}
