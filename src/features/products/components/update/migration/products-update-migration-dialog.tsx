"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import {
  IReassignProducts,
  ReassignProductsSchema,
} from "../../../schemas/products-schemas";
import { useCategories } from "@/features/categories/services/categories-querys";
import { useReassignProducts } from "@/features/products/services/products-mutations";

interface Props {
  products: {
    id: string;
    name: string;
    categoryId?: string;
    subcategoryId?: string;
  }[];
}

type FormValues = {
  items: {
    productId: string;
    categoryId: string;
    subcategoryId: string;
  }[];
};

export default function MigrateProduct({ products }: Props) {
  const { data: categories, isLoading: isLoadingCategories, isError: getCategoriesError } = useCategories({ subcategories: true });
  const { mutateAsync } = useReassignProducts();

  // Initialize form default values with mapped products
  const defaultValues: FormValues = {
    items: products.map((p) => ({
      productId: p.id,
      categoryId: p.categoryId || (categories?.[0]?.id || ""),
      subcategoryId: p.subcategoryId || "",
    })),
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(ReassignProductsSchema),
    defaultValues,
  });

  // Manage dynamic array of products in the form
  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  // Watch changes on the form items to update category-dependent subcategories
  const watchedItems = watch("items");

  const onSubmit = async (data: FormValues) => {
    try {
      // Data is correctly formatted: array with productId, categoryId, subcategoryId
      await mutateAsync(data.items);
      toast.success("Products updated successfully.");
    } catch (error) {
      toastError(error as AxiosError, "general");
    }
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError) return <div>Error loading categories</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
      {fields.map((field, index) => {
        const currentCategoryId = watchedItems?.[index]?.categoryId || "";
        const currentSubcategories =
          categories?.find((cat: any) => cat.id === currentCategoryId)?.subcategories || [];

        return (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-300 pb-4"
          >
            {/* Product name */}
            <div className="w-full sm:w-1/3 font-semibold">{products[index]?.name}</div>

            {/* Category select */}
            <div className="w-full sm:w-1/3 flex flex-col">
              <label htmlFor={`items.${index}.categoryId`} className="text-sm text-gray-600 mb-1">
                Category
              </label>
              <select
                id={`items.${index}.categoryId`}
                {...register(`items.${index}.categoryId` as const)}
                className="border rounded px-2 py-1 text-sm"
                onChange={(e) => {
                  const newCatId = e.target.value;
                  setValue(`items.${index}.categoryId`, newCatId);

                  // When category changes, set subcategory to first child or empty
                  const subs = categories?.find((c: any) => c.id === newCatId)?.subcategories || [];
                  setValue(`items.${index}.subcategoryId`, subs.length > 0 ? subs[0].id : "");
                }}
              >
                {categories?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.items?.[index]?.categoryId && (
                <p className="text-red-600 text-xs mt-1">{errors.items[index].categoryId?.message}</p>
              )}
            </div>

            {/* Subcategory select */}
            <div className="w-full sm:w-1/3 flex flex-col">
              <label htmlFor={`items.${index}.subcategoryId`} className="text-sm text-gray-600 mb-1">
                Subcategory
              </label>
              <select
                id={`items.${index}.subcategoryId`}
                {...register(`items.${index}.subcategoryId` as const)}
                className="border rounded px-2 py-1 text-sm"
                disabled={currentSubcategories.length === 0}
              >
                {currentSubcategories.length > 0 ? (
                  currentSubcategories.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))
                ) : (
                  <option value="">No subcategories</option>
                )}
              </select>
              {errors.items?.[index]?.subcategoryId && (
                <p className="text-red-600 text-xs mt-1">{errors.items[index].subcategoryId?.message}</p>
              )}
            </div>

            {/* Hidden input for productId */}
            <input
              type="hidden"
              {...register(`items.${index}.productId` as const)}
              value={field.productId}
            />
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Save changes
      </button>
    </form>
  );
}
