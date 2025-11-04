"use client";

import { Input } from "@/components/ui/input";
import {
  useDeleteTag,
  useToggleCreateTag,
} from "../../services/tags-mutations";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface Tag {
  id: string;
  name: string;
  _count?: { products?: number };
}

interface IToggleCreateTag {
  /** existing tags ids */
  initialValue?: string[];
  /** optional complete tags objects (for render names) */
  initialTags?: Tag[];
  /** actuals ids (thrut) */
  value: string[];
  /** Callback when change tag */
  onChangeAction: (tags: string[]) => void;
}

export default function ToggleCreateTagInput({
  initialValue = [],
  initialTags = [],
  value,
  onChangeAction,
}: IToggleCreateTag) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tagValues, setTagValues] = useState<Tag[]>([]);

  const { mutate } = useToggleCreateTag();
  const { mutate: deleteMutate } = useDeleteTag();

  useEffect(() => {
    const mapped = initialValue.map((id) => {
      const tagObj = initialTags.find((t) => t.id === id);
      return tagObj || { id, name: id };
    });
    setTagValues(mapped);
    
  }, [JSON.stringify(initialValue), JSON.stringify(initialTags)]);

  const addTag = async (name: string) => {
    if (!name.trim()) return;

    mutate(
      { name },
      {
        onSettled(data) {
          if (!data) return;
          const {
            success,
            data: { tag, prev_status },
          } = data;

          if (tag._count?.products && tag._count.products > 0) {
            const was = prev_status === "ARCHIVED" ? "ARCHIVADA" : "ELIMINADA";
            const became =
              prev_status === "ARCHIVED" ? "DESARCHIVÓ" : "REESTABLECIÓ";
            toast.warning(`Atención ⚠️: Etiqueta ${became} con productos`, {
              description: `La etiqueta "${tag.name}" estaba ${was} y se ${became}. Revise los productos ya asociados.`,
              action: {
                label: "Gestionar",
                onClick: () =>
                  window.open(
                    `/admin/dashboard/tags/${tag.id}`,
                    "_blank",
                    "noopener,noreferrer"
                  ),
              },
              duration: 8000,
            });
          }
        },
        onSuccess: (data) => {
          if (!data?.data?.tag) return;
          const {
            data: { tag },
          } = data;

          const exists = tagValues.some((t) => t.id === tag.id);
          if (exists) {
            toast.info(`La etiqueta "${tag.name}" ya está en uso.`);
            return;
          }

          toast.success(`Etiqueta "${tag.name}" agregada exitosamente.`);
          onChangeAction([...value, tag.id]);
          setTagValues((prev) => [...prev, tag]);
          setInputValue("");
        },
        onError: (e) => {
          toastError(e as AxiosError, "general");
        },
      }
    );
  };

  const removeTag = (tagToRemove: Tag) => {
    onChangeAction(value.filter((tagId) => tagId !== tagToRemove.id));
    setTagValues((prev) => prev.filter((tag) => tag.id !== tagToRemove.id));

    if (tagToRemove._count?.products && tagToRemove._count.products <= 0) {
      deleteMutate(tagToRemove.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nombre de la etiqueta"
          aria-label="Nombre de la etiqueta"
        />
        <Button
          type="button"
          className="cursor-pointer"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            addTag(inputValue).finally(() => setIsLoading(false));
          }}
        >
          {isLoading ? "Agregando..." : "Agregar etiqueta"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tagValues.map((tag) => (
          <div
            key={tag.id}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
          >
            <span>{tag.name}</span>
            <X
              onClick={() => removeTag(tag)}
              className="w-4 h-4 cursor-pointer hover:text-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
