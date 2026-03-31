"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  SelectCategoriesFormValues,
  SelectCategoriesSchema,
} from "@/features/admin/store-managment/schemas/items/items-schema";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { useCreateItem } from "@/features/admin/store-managment/services/items/items-mutations";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { ItemSection } from "@/types/resources/home-section-types";
import { ICategory } from "@/types/resources/category-type";

interface Props {
  sectionId: string;
  items: ItemSection[];
  closeDialog: () => void;
}

export default function AddCategoryForm({
  sectionId,
  items,
  closeDialog,
}: Props) {
  const {
    data,
    isLoading,
    isError,
  } = useCategories({});
  const categories = data?.success ? data.data : [];

  const { mutate, isPending } = useCreateItem();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SelectCategoriesFormValues>({
    resolver: zodResolver(SelectCategoriesSchema),
    defaultValues: {
      categoryIds: [],
    },
  });

  const selectedIds = watch("categoryIds");

  const toggleCategory = (categoryId: string) => {
    setValue(
      "categoryIds",
      selectedIds.includes(categoryId)
        ? selectedIds.filter((id) => id !== categoryId)
        : [...selectedIds, categoryId],
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: SelectCategoriesFormValues) => {
    let isAlready = 0;
    let isNotAlready = 0;

    try {
      const idsToCreate = data.categoryIds.filter((id) => {
        const isAlreadyOn = items.some(
          (item: ItemSection) => item.categoryId === id,
        );
        if (isAlreadyOn) {
          isAlready++;
        } else {
          isNotAlready++;
        }
        return !isAlreadyOn;
      });

      idsToCreate.forEach((id: string) => {
        mutate(
          {
            sectionId,
            position: 10,
            itemType: "CATEGORY",
            categoryId: id,
          },
          {
            onError: (e) => {
              toastError(e as AxiosError, "general");
            },
          }
        );
      });
      if (isAlready > 0) {
        toast.info(`${isAlready} categoria/s ya se encontraban en la sección`);
      }
      if (isNotAlready > 0) {
        toast.success(`${isNotAlready} categoria/s agregadas a la sección`);
      }
    } catch (error) {
      toast.error("Error al agregar categoria/s");
      console.error(error);
    } finally {
      isAlready = 0;
      isNotAlready = 0;
      closeDialog();
    }
  };

  if (isLoading) return <p>Cargando categorias...</p>;
  if (isError) return <p>Error al cargar categorias</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Seleccionadas: <strong>{selectedIds.length}</strong>
        </p>
      </div>

      {/* Grid de cards */}
      <div className="flex flex-wrap gap-4">
        {categories.map((category: ICategory) => {
          const selected = selectedIds.includes(category.id);

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={cn(
                "flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                "hover:border-primary cursor-pointer",
                selected
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-border"
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {errors.categoryIds && (
        <p className="text-sm text-red-500">{errors.categoryIds.message}</p>
      )}

      {/* Submit */}
      {!isPending ? (
        <Button type="submit" className="w-full">
          Agregar categorías
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Agregar categorías
        </Button>
      )}
    </form>
  );
}
