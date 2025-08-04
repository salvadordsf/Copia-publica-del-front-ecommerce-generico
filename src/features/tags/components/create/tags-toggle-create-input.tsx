"use client";

import { Input } from "@/components/ui/input";
import { useDeleteTag, useToggleCreateTag } from "../../services/tags-mutations";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import { useState } from "react";

interface IToggleCreateTag {
  initialValue?: string[];
  value: string[];
  onChangeAction: (tags: any[]) => void;
}

export default function ToggleCreateTagInput({
  initialValue = [],
  value,
  onChangeAction,
}: IToggleCreateTag) {

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tagValues, setTagValues] = useState<any[]>(initialValue);

  const { mutate } = useToggleCreateTag();
  const { mutate: deleteMutate } = useDeleteTag();

  const addTag = async (name: string) => {
    if (!name.trim()) return;

    mutate(
      { name },
      {
        onSettled(data) {
          if (data._count.products > 0) {
            if (data.status === "ARCHIVED") {
              toast.warning("Atención ⚠️: Etiqueta desarchivada con productos", {
                description: `La etiqueta "${data.name}" estaba archivada y se desarchivo. Recuerde gestionar los productos ya asociados con anterioridad.`,
                action: {
                  label: "Gestionar",
                  onClick: () => window.open(`/tags/${data.id}`, "_blank", "noopener,noreferrer"),
                },
                duration: 8000,
              });
            } else if (data.status === "DELETED") {
              toast.warning("Atención ⚠️: Etiqueta reestablecida con productos", {
                description: `La etiqueta "${data.name}" estaba eliminada y se reestableció. Recuerde gestionar los productos ya asociados con anterioridad.`,
                action: {
                  label: "Gestionar",
                  onClick: () => window.open(`/tags/${data.id}`, "_blank", "noopener,noreferrer"),
                },
                duration: 8000,
              });
            }

          }
        },
        onSuccess: (tag) => {
          console.log(tag)
          const exists = tagValues.some(t => t.id === tag.id);
          if (exists) {
            toast.info(`La etiqueta "${tag.name}" ya está en uso.`);
            return;
          }

          toast.success(`Etiqueta "${tag.name}" agregada exitosamente.`);
          onChangeAction([...value, tag.id]);
          setTagValues((prev) => [...prev, tag]);
          setInputValue("");
          console.log(value, tagValues)
        },
        onError: (e) => {
          toastError(e as AxiosError, "general");
        },
      }
    );
  };

  const removeTag = (tagToRemove: any) => {
    onChangeAction(value.filter((tagId) => tagId !== tagToRemove.id));
    setTagValues(prev => prev.filter((tag) => tag.id !== tagToRemove.id))
    if (tagToRemove._count.products <= 0) {
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
        {tagValues && tagValues.length > 0 && tagValues.map((tag) => (
          <div
            key={tag.id}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
          >
            <span>{tag.name}</span>
            <X
              onClick={() => removeTag(tag)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
