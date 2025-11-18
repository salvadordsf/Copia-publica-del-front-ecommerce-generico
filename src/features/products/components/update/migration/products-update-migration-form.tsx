import { useCategories } from "@/features/categories/services/categories-querys";
import {
  ReassignProductsFormRes,
  ReassignProductsSchema,
} from "@/features/products/schemas/products-schemas";
import { Card, CardContent } from "@/components/ui/card";
import { useReassignProducts } from "@/features/products/services/products-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { useEffect, useState, useMemo } from "react";
import { IProduct } from "@/types/resources/product-type";
import ResourceStatusPil from "@/components/dashboard/resource-components/resource-status/resource-status-resource-pil";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IMigrateProductsProps {
  products: IProduct[];
  onConfirm: () => void;
}

export default function MigrateProductsForm({
  products,
  onConfirm,
}: IMigrateProductsProps) {
  //Filter products by status checkbox
  const [active, setActive] = useState(true);
  const [archived, setArchived] = useState(true);
  const [deleted, setDeleted] = useState(true);

  //Derive filtered products
  const filteredProductsByStatus = useMemo(() => {
    return products.filter((prod) => {
      if (active && prod.status === "ACTIVE") return true;
      if (archived && prod.status === "ARCHIVED") return true;
      if (deleted && prod.status === "DELETED") return true;
      return false;
    });
  }, [products, active, archived, deleted]);

  //Query hooks
  //Get categories
  const {
    data: { data: categories } = {},
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });
  //Reassign mutate
  const { mutateAsync } = useReassignProducts();

  //React hook form
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(ReassignProductsSchema),
    defaultValues: {
      items: filteredProductsByStatus.map((product) => ({
        productId: product.id,
        categoryId: product.categoryId || "",
        subcategoryId: product.subcategoryId || "",
      })),
    },
  });

  //React hook form useFieldArray hook for dynamic form fields generation
  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  //Remapping of the products when status filters change
  useEffect(() => {
    reset({
      items: filteredProductsByStatus.map((product) => ({
        productId: product.id,
        categoryId: product.categoryId || "",
        subcategoryId: product.subcategoryId || "",
      })),
    });
  }, [filteredProductsByStatus, reset]);

  //Watch fields
  const watchedItems = watch("items");

  const onSubmit = async (data: ReassignProductsFormRes) => {
    try {
      await mutateAsync(data.items);
      toast.success(
        `${data.items.length} productos actualizados correctamente.`
      );
      onConfirm();
    } catch (error) {
      toastError(error as AxiosError, "general");
    }
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError) return <div>Error loading categories...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto overflow-y-auto rounded-none"
    >
      {/*Status filters*/}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 sm:mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Input
            className="w-3"
            type="checkbox"
            checked={active}
            onChange={() => setActive((prev) => !prev)}
          />
          Activos
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <Input
            className="w-3"
            type="checkbox"
            checked={archived}
            onChange={() => setArchived((prev) => !prev)}
          />
          Archivados
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <Input
            className="w-3"
            type="checkbox"
            checked={deleted}
            onChange={() => setDeleted((prev) => !prev)}
          />
          Eliminados
        </label>
      </div>

      {/*Products fields inputs*/}
      {fields.length === 0 && (
        <p className="text-center text-gray-500">No hay productos filtrados.</p>
      )}

      {fields.map((field, idx) => {
        //Get the complete product object data
        const productData = products.find((p) => p.id === field.productId);

        //If product not exist in the original array return null
        if (!productData) return null;

        //Get the current product´s categoryId
        const currentCategoryId = watchedItems[idx]?.categoryId || "";

        //Get the available subcats from current category
        const availableSubcats =
          categories?.find((c: any) => c.id === currentCategoryId)
            ?.subcategories || [];

        return (
          <Card
            key={field.id}
            className={`p-4 shadow-sm border ${
              errors.items?.[idx]
                ? "border-red-500 shadow-red-300"
                : "border-gray-200"
            }`}
          >
            <CardContent className="p-0 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/*Name with link*/}
                <div className="w-full sm:w-1/3 font-semibold">
                  <a
                    href={`/admin/dashboard/products/${productData.id}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {productData.name}
                  </a>
                </div>

                {/*Category select*/}
                <div className="w-full sm:w-1/3 flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Categoría
                  </label>
                  <select
                    {...register(`items.${idx}.categoryId`)}
                    onChange={(evt) => {
                      const newCatId = evt.target.value;
                      setValue(`items.${idx}.categoryId`, newCatId);
                      //Set the new options for the subcategory input when category change
                      setValue(
                        `items.${idx}.subcategoryId`,
                        categories.find((c: any) => c.id === newCatId)
                          ?.subcategories?.[0]?.id || ""
                      );
                    }}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/*Subcategory select*/}
                <div className="w-full sm:w-1/3 flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Subcategoría
                  </label>

                  <select
                    {...register(`items.${idx}.subcategoryId`)}
                    //if availableSubcats is 0 the select is disabled
                    disabled={availableSubcats.length === 0}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {availableSubcats.length > 0 ? (
                      availableSubcats.map((sub: any) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No hay subcategorías</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t text-xs text-gray-600 flex flex-wrap gap-4">
                {/*Status */}
                <ResourceStatusPil status={productData.status} />
                {/*Price */}
                <p>
                  <strong>Precio:</strong>{" "}
                  {productData.price ? `$${productData.price}` : "N/A"}
                </p>
                {/*Stock */}
                <p>
                  <strong>Stock:</strong> {productData.stock ?? "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/*Confirm migration*/}
      <div className="flex">
        <Button
          type="submit"
          className="my-0 mx-auto disabled:opacity-50 font-bold cursor-pointer"
          disabled={isSubmitting}
        >
          Completar migración
        </Button>
      </div>
    </form>
  );
}
