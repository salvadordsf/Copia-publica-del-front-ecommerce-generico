"use client";

import { useUpdateProduct } from "@/features/admin/products/services/products-mutations";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import UiDivider from "@/components/dashboard/divider/divider";
import ToggleCreateTagInput from "@/features/admin/tags/components/create/tags-toggle-create-input";

interface ProductTagsManagerProps {
  product: any;
  initialTags: string[];
}

export default function ProductTagsManager({
  product,
  initialTags,
}: ProductTagsManagerProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const updateProduct = useUpdateProduct(product.id);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);

    updateProduct.mutate(
      { tagsAry: newTags },
      {
        onError: () => {
          toast.error("Error al actualizar las etiquetas ❌");
        },
      }
    );
  };

  return (
    <>
      <UiDivider />
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Gestor de etiquetas</h3>
        <ToggleCreateTagInput
          initialValue={product.tags.map((t: any) => t.id)}
          initialTags={product.tags}
          value={tags}
          onChangeAction={handleTagsChange}
        />
      </div>
    </>
  );
}
