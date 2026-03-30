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
import { useState, useEffect, useRef } from "react";
import { ITag } from "@/types/resources/tag-type";

interface IToggleCreateTag {
  /** Existing tag IDs to initialize the component with */
  initialValue?: string[];
  /** Full tag objects matching initialValue IDs (used to render names instead of raw IDs) */
  initialTags?: ITag[];
  /** Current active tag IDs (source of truth, controlled from parent) */
  value: string[];
  /** Called whenever the tag selection changes, receives updated tag ID array */
  onChangeAction: (tags: string[]) => void;
}

export default function ToggleCreateTagInput({
  initialValue = [],
  initialTags = [],
  value,
  onChangeAction,
}: IToggleCreateTag) {
  // Controls the loading state of the add button during mutation
  const [isLoading, setIsLoading] = useState(false);
  // Controlled input value for the tag name field
  const [inputValue, setInputValue] = useState("");
  // Internal list of full tag objects used for rendering the tag chips
  const [tagValues, setTagValues] = useState<ITag[]>([]);

  const { mutate } = useToggleCreateTag();
  const { mutate: deleteMutate } = useDeleteTag();

  // Refs to track previous prop values and avoid unnecessary effect re-runs
  const prevInitialValue = useRef<string[]>([]);
  const prevInitialTags = useRef<ITag[]>([]);

  // Syncs internal tagValues when initialValue or initialTags props change.
  // Uses manual JSON comparison via refs to prevent re-runs when parent
  // passes new array references with the same content.
  useEffect(() => {
    const valueChanged =
      JSON.stringify(prevInitialValue.current) !== JSON.stringify(initialValue);
    const tagsChanged =
      JSON.stringify(prevInitialTags.current) !== JSON.stringify(initialTags);

    // Skip if nothing actually changed
    if (!valueChanged && !tagsChanged) return;

    // Update refs to latest values
    prevInitialValue.current = initialValue;
    prevInitialTags.current = initialTags;

    // Map each ID to its full tag object, falling back to { id, name: id } if not found
    const mapped = initialValue.map((id) => {
      const tagObj = initialTags.find((t) => t.id === id);
      return tagObj || ({ id, name: id } as ITag);
    });

    setTagValues(mapped);
  }, [initialValue, initialTags]);

  // Handles tag creation or reactivation via the toggle-create mutation.
  // If the tag already exists in the current selection, shows an info toast.
  // If the tag was previously archived/deleted and has associated products,
  // shows a warning toast with a link to manage those products.
  const addTag = async (name: string) => {
    if (!name.trim()) return;

    mutate(
      { name },
      {
        onSettled(data) {
          if (!data) return;
          if (!data.success) return;

          const {
            data: { tag, prev_status },
          } = data;

          // Warn if the tag was restored and already has products linked to it
          if (
            tag._count?.products &&
            tag._count.products > 0 &&
            prev_status !== "ACTIVE"
          ) {
            const was = prev_status === "ARCHIVED" ? "ARCHIVADA" : "ELIMINADA";
            const became =
              prev_status === "ARCHIVED" ? "DESARCHIVÓ" : "REESTABLECIÓ";

            toast.warning(
              `Atención ⚠️: La etiqueta se ${became} con productos asociados`,
              {
                description: `La etiqueta "${tag.name}" estaba ${was} y se ${became}. Revise los productos ya asociados.`,
                action: {
                  label: "Gestionar",
                  onClick: () =>
                    window.open(
                      `/admin/dashboard/tags/${tag.id}`,
                      "_blank",
                      "noopener,noreferrer",
                    ),
                },
                duration: 8000,
              },
            );
          }
        },
        onSuccess: (data) => {
          if (!data.success) return;
          if (!data?.data?.tag) return;

          const {
            data: { tag },
          } = data;

          // Prevent duplicates in the current selection
          const exists = tagValues.some((t) => t.id === tag.id);
          if (exists) {
            toast.info(`La etiqueta "${tag.name}" ya está en uso.`);
            return;
          }

          toast.success(`Etiqueta "${tag.name}" agregada exitosamente.`);

          // Notify parent with updated IDs and update internal chip list
          onChangeAction([...value, tag.id]);
          setTagValues((prev) => [...prev, tag]);
          setInputValue("");
        },
        onError: (e) => {
          toastError(e as AxiosError, "general");
        },
      },
    );
  };

  // Removes a tag from the current selection.
  // If the tag has no associated products, it gets permanently deleted via mutation.
  const removeTag = (tagToRemove: ITag) => {
    // Update parent state and internal chip list
    onChangeAction(value.filter((tagId) => tagId !== tagToRemove.id));
    setTagValues((prev) => prev.filter((tag) => tag.id !== tagToRemove.id));

    // Only delete the tag from the DB if it has no products linked
    if (!tagToRemove._count?.products || tagToRemove._count.products === 0) {
      deleteMutate(tagToRemove.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tag input and add button */}
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

      {/* Rendered tag chips with remove button */}
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
