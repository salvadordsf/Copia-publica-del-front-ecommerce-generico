"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useProductsFiltersStore } from "../../stores/products-filters";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { ICategory } from "@/types/resources/category-type";
import { ISubcategory } from "@/types/resources/subcategory-type";
import { ProductsSortFilter } from "./products-sort-filter";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersFormValues {
  priceMin?: string;
  priceMax?: string;
  categoryId?: string;
  subcategoryId?: string;
}

export function ProductsFilters() {
  //Get the filters store fn and values
  const {
    filters: { categoryId, subcategoryId, priceMin, priceMax },
    setCategoryId,
    setSubcategoryId,
    setPriceRange,
    resetFilters,
  } = useProductsFiltersStore();

  //get the active categories with subcategories
  const { data: categoriesRes, isLoading } = useCategories({
    status: "ACTIVE",
    subcategories: true,
  });

  //create the categories ary
  const categories = useMemo<ICategory[]>(() => {
    if (!categoriesRes?.success) return [];
    return categoriesRes.data;
  }, [categoriesRes]);

  //find the selected category for get the availables subcategories ary
  const selectedCategory = useMemo(() => {
    return categories.find((c) => c.id === categoryId);
  }, [categories, categoryId]);

  //get the availables subcategories ary from the category selected
  const subcategories = useMemo<ISubcategory[]>(() => {
    return selectedCategory?.subcategories ?? [];
  }, [selectedCategory]);

  //Create the react hook form
  const { register, control, watch, reset, setValue } =
    useForm<FiltersFormValues>({
      defaultValues: {
        priceMin: priceMin ?? "",
        priceMax: priceMax ?? "",
        categoryId: categoryId ?? "",
        subcategoryId: subcategoryId ?? "",
      },
    });

  //watch the priceMin and priceMax inputs for get the values
  const watchedMin = watch("priceMin");
  const watchedMax = watch("priceMax");

  //Sync prices with the store
  useEffect(() => {
    const min =
      watchedMin !== undefined && watchedMin !== ""
        ? Number(watchedMin)
        : undefined;

    const max =
      watchedMax !== undefined && watchedMax !== ""
        ? Number(watchedMax)
        : undefined;

    setPriceRange(min, max);
  }, [watchedMin, watchedMax, setPriceRange]);

  //Sync the store filters when change
  useEffect(() => {
    reset({
      priceMin: priceMin ?? "",
      priceMax: priceMax ?? "",
      categoryId: categoryId ?? "",
      subcategoryId: subcategoryId ?? "",
    });
  }, [priceMin, priceMax, categoryId, subcategoryId, reset]);

  //state for style mobile/desktop
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  return (
    <aside className="flex flex-col gap-4 rounded-xl border p-4">
      {/* sorter */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Ordenar por</span>
        <ProductsSortFilter />
      </div>

      {/* more filters only for mobile/tablet*/}
      <div className="flex lg:hidden">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setShowFiltersMobile((v) => !v)}
        >
          {showFiltersMobile ? "Ocultar filtros" : "Filtrar"}
        </Button>
      </div>

      {/* filters form */}
      <form
        className={`
          flex flex-col gap-4
          lg:flex
          ${showFiltersMobile ? "flex" : "hidden"}
        `}
      >
        {/* price */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Precio</span>

          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              placeholder="Mín"
              {...register("priceMin")}
            />

            <Input
              type="number"
              min={0}
              placeholder="Máx"
              {...register("priceMax")}
            />
          </div>
        </div>

        {/* category */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Categoría</span>

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                value={field.value ?? undefined}
                disabled={isLoading}
                onValueChange={(value) => {
                  const val = value || undefined;

                  field.onChange(value);
                  setCategoryId(val);

                  setValue("subcategoryId", "");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoading ? "Cargando categorías..." : "Todas las categorías"} />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="undefined">
                    Todas las categorías
                  </SelectItem>

                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* subcategory */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Subcategoría</span>

          <Controller
            control={control}
            name="subcategoryId"
            render={({ field }) => (
              <Select
                value={field.value ?? undefined}
                disabled={!categoryId}
                onValueChange={(value) => {
                  const val = value || undefined;

                  field.onChange(value);
                  setSubcategoryId(val);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas las subcategorías" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="undefined">
                    Todas las subcategorías
                  </SelectItem>

                  {subcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* reset filters */}
        <Button
          type="button"
          variant="ghost"
          className="self-start px-0 text-sm text-muted-foreground"
          onClick={() => {
            resetFilters();
            reset({
              priceMin: "",
              priceMax: "",
              categoryId: "",
              subcategoryId: "",
            });

            setShowFiltersMobile(false);
          }}
        >
          Limpiar filtros
        </Button>
      </form>
    </aside>
  );
}
