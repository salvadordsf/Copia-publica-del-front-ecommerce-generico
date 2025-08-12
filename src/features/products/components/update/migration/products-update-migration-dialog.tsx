import { useCategories } from "@/features/categories/services/categories-querys";
import {
  ReassignProductsFormRes,
  ReassignProductsSchema,
} from "@/features/products/schemas/products-schemas";
import { useReassignProducts } from "@/features/products/services/products-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { useEffect } from "react";

interface IProductsObject {
  id: string;
  name: string;
  categoryId?: string;
  subcategoryId?: string;
}

interface IMigrateProductsProps {
  products: IProductsObject[];
}

export default function MigrateProducts({ products }: IMigrateProductsProps) {
  //Querys + mutations hooks
  //Get categories
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });
  //get migration feature
  const { mutateAsync } = useReassignProducts();

  //React hook form hooks + defaultValues
  //React hook form default values for the first render
  const defaultValues = {
    items: products.map((product: IProductsObject) => {
      return {
        productId: product.id,
        categoryId: product?.categoryId || "",
        subcategoryId: product?.subcategoryId || "",
      };
    }),
  };
  //React hook form useForm
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
    defaultValues,
  });
  // Reset form values when products prop changes
  useEffect(() => {
    reset({
      items: products.map((product) => ({
        productId: product.id,
        categoryId: product?.categoryId || "",
        subcategoryId: product?.subcategoryId || "",
      })),
    });
  }, [products, reset]);
  //React hook form useFieldArray
  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  //Watch the fields changes for update avaliable subcategorys
  const watchedItems = watch("items");

  //On submit function
  const onSubmit = async (data: ReassignProductsFormRes) => {
    try {
      await mutateAsync(data.items);
      toast.success("Products updated successfully.");
      reset(defaultValues);
    } catch (error) {
      toastError(error as AxiosError, "general");
    }
  };

  //Render loadings for getCategories
  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError) return <div>Error loading categories</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto"
    >
      {fields.map((field, idx) => {
        //Get the current field category id selected
        const currentFieldCategoryId = watchedItems[idx]?.categoryId || "";
        // Find the currently selected category in the categories array to get its subcategories
        const avaliableFieldSubcategories =
          categories.find(
            (category: any) => category.id === currentFieldCategoryId
          )?.subcategories || [];

        return (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-300 pb-4"
          >
            {/*Product name*/}
            <div className="w-full sm:w-1/3 font-semibold">
              {products[idx]?.name}
            </div>

            {/*Category*/}
            <div className="w-full sm:w-1/3 flex flex-col">
              <label
                htmlFor={`items.${idx}.categoryId`}
                className="text-sm text-gray-600 mb-1"
              >
                Categoría
                <select
                  id={`items.${idx}.categoryId`}
                  {...register(`items.${idx}.categoryId`)}
                  onChange={(evt) => {
                    const newCurrentFieldCategoryId = evt.target.value;
                    setValue(
                      `items.${idx}.categoryId`,
                      newCurrentFieldCategoryId
                    );

                    // When category changes, set subcategory to first child or empty
                    setValue(
                      `items.${idx}.subcategoryId`,
                      categories.find(
                        (category: any) =>
                          category.id === newCurrentFieldCategoryId
                      ).subcategories[0]?.id || ""
                    );
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/*Subcategory*/}
            <div>
              <label
                htmlFor={`items.${idx}.subcategoryId`}
                className="text-sm text-gray-600 mb-1"
              >
                Subcategoría
              </label>
              <select
                id={`items.${idx}.subcategoryId`}
                {...register(`items.${idx}.subcategoryId`)}
                disabled={avaliableFieldSubcategories.length === 0}
                className="border rounded px-2 py-1 text-sm"
              >
                {avaliableFieldSubcategories.length > 0 ? (
                  avaliableFieldSubcategories.map((subcategory: any) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))
                ) : (
                  <option value="">No hay subcategoría</option>
                )}
              </select>
            </div>
          </div>
        );
      })}
      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        Completar migración
      </button>
    </form>
  );
}
