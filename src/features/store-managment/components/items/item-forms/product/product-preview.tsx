"use client";

import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import UiTable from "@/components/dashboard/table/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProductsBulkFilters } from "@/features/products/stores/products-bulk-filters";
import { useCreateItem } from "@/features/store-managment/services/items/items-mutations";
import { useProducts } from "@/features/products/services/products-querys";
import MethodsBtns from "@/components/dashboard/btns/btn-request-method";
import { IProduct } from "@/types/resources/product-type";
import { toast } from "sonner";

interface Props {
  sectionId: string;
  items: any[];
  closeDialog: () => void;
}

export default function ProductPreview({
  sectionId,
  items,
  closeDialog,
}: Props) {
  const { filters } = useProductsBulkFilters();
  const { mutate } = useCreateItem();
  const [showPreview, setShowPreview] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setShowPreview(false);
  }, [filters]);

  const {
    data,
    isLoading: isLoadingProducts,
    isError: getProductsError,
  } = useProducts({
    ...filters,
    status: "ACTIVE",
    pageSize: "10",
  });

  const total = data?.data?.pagination.totalItems ?? 0;

  const {
    data: fullData,
    isLoading: isLoadingFull,
    isError: isErrorFull,
  } = useProducts(
    showPreview
      ? {
          ...filters,
          pageSize: total >= 10 ? String(total) : "10",
          status: "ACTIVE",
        }
      : {}
  );

  const products: IProduct[] =
    fullData?.data?.data.sort(
      (a: IProduct, b: IProduct) => b.relevance - a.relevance
    ) ?? [];

  const createProductItem = async () => {
    if (isCreating) return;

    setIsCreating(true);
    let isAlready = 0;
    let isNotAlready = 0;

    try {
      products
        .filter((prod) => {
          const isAlreadyIn = items.some((item) => item.productId === prod.id);
          if (isAlreadyIn) {
            isAlready++;
          } else {
            isNotAlready++;
          }
          return !isAlreadyIn;
        })
        .forEach((prod) => {
          mutate({
            sectionId,
            itemType: "PRODUCT",
            position: 10,
            productId: prod.id,
          });
        });
      if (isNotAlready > 0) {
        toast.success(`${isNotAlready} producto/s agregados a la sección`);
      }
      if (isAlready > 0) {
        toast.info(`${isAlready} producto/s ya se encontraban en la sección`);
      }
    } catch (e) {
      toast.error("Error al agregar todos los productos a la sección");
    } finally {
      setIsCreating(false);
      closeDialog();
      setStep(1);
      isAlready = 0;
      isNotAlready = 0;
    }
  };

  if (isLoadingProducts) return <div>Loading products...</div>;
  if (getProductsError) return <div>Error al obtener productos filtrados</div>;

  return (
    <>
      <div className="flex flex-col gap-1 items">
        <p>
          Productos seleccionados: <strong>{total}</strong>
        </p>

        {total > 0 && <div className="flex flex-col sm:flex-row gap-5"></div>}
        {total > 0 && !showPreview && step === 1 && (
          <Button
            onClick={() => {
              setShowPreview(true);
              setStep(2);
            }}
            className="cursor-pointer sm:w-82"
          >
            Ver previsualización (listar {total} productos)
          </Button>
        )}
      </div>

      {isLoadingFull && <div>Cargando listado completo...</div>}
      {showPreview && fullData && total > 0 && (
        <UiTable
          className="mt-5"
          caption={`Listado de los ${total} productos seleccionados con los filtros.`}
          rows={{
            headerRow: [
              {
                type: "header",
                text: "Nombre",
              },
              {
                type: "header",
                text: "Precio",
              },
              {
                type: "header",
                text: "Stock",
              },
              {
                type: "header",
                text: "Relevancia",
              },
            ],
            bodyRows:
              products &&
              products.map((product) => {
                return {
                  rowCells: [
                    { type: "body", text: product.name },
                    { type: "body", text: `$${product.price}` },
                    { type: "body", text: product.stock.toString() },
                    { type: "body", text: product.relevance.toString() },
                  ],
                  className: statusRowClassGenerator(product),
                  onClickAction: () => {},
                };
              }),
          }}
        />
      )}
      {step === 2 && (
        <div className="flex">
          {!isCreating ? (
            <MethodsBtns
              selectedType="create"
              extraClassName="mt-8"
              onClickAct={createProductItem}
            >
              Agregar {total} producto/s a la sección
            </MethodsBtns>
          ) : (
            <MethodsBtns
              selectedType="create"
              extraClassName="mt-8 opacity-50"
              onClickAct={() => {}}
              isDisabled={true}
            >
              Agregar {total} producto/s a la sección
            </MethodsBtns>
          )}
        </div>
      )}
    </>
  );
}
