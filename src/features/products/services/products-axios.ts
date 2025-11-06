import axiosInstance from "@/lib/axios/axios";
import {
  ICreateProduct,
  IFilterBulkProductsQuery,
  IGetProductsQuery,
  IReassignProducts,
  IUpdateBulkProducts,
  IUpdateProduct,
} from "../schemas/products-schemas";

export const getProducts = async (data: IGetProductsQuery) => {
  const params: any = {
    ...(data?.page && { page: data?.page }),
    ...(data?.pageSize && { pageSize: data?.pageSize }),

    ...(data?.name && { name: data?.name }),
    ...(data?.search && { search: data?.search }),

    ...(data?.priceMin && { priceMin: data?.priceMin }),
    ...(data?.priceMax && { priceMax: data?.priceMax }),

    ...(data?.relevance && { relevance: data?.relevance }),
    ...(data?.status && { status: data?.status }),

    ...(data?.category && { category: data?.category }),
    ...(data?.subcategory && { subcategory: data?.subcategory }),
    ...(data?.tags && { tags: data?.tags }),

    ...(data?.tagsAry && { tagsAry: data?.tagsAry }),
    ...(data?.tagsAry && { tagsAry: data?.tagsAry }),

    ...(data?.categoryId && { categoryId: data?.categoryId }),
    ...(data?.subcategoryId && { subcategoryId: data?.subcategoryId }),

    ...(data?.sortBy && { sortBy: data?.sortBy }),
    ...(data?.sortOrder && { sortOrder: data?.sortOrder }),
  };

  const res = await axiosInstance.get("/products", {
    params,
  });
  console.log(res);
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/products/${id}`);
  console.log(res);
  return res.data;
};

export const createProduct = async (data: ICreateProduct) => {
  const res = await axiosInstance.post("/products", data);
  console.log(res);
  return res.data;
};

export const updateProduct = async (id: string, data: IUpdateProduct) => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const reassignProducts = async (data: IReassignProducts) => {
  const res = await axiosInstance.patch(`/products/reassign`, data);
  console.log(data);
  console.log(res);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  console.log(res);
  return res.data;
};

export const updateManyProducts = async (
  filter: IFilterBulkProductsQuery,
  data: IUpdateBulkProducts
) => {
  const params: IFilterBulkProductsQuery = {
    ...(filter?.name && { name: filter?.name }),
    ...(filter?.search && { search: filter?.search }),

    ...(filter?.priceMin && { priceMin: filter?.priceMin }),
    ...(filter?.priceMax && { priceMax: filter?.priceMax }),

    ...(filter?.relevance && { relevance: filter?.relevance }),
    ...(filter?.status && { status: filter?.status }),

    ...(filter?.categoryId && { categoryId: filter?.categoryId }),
    ...(filter?.subcategoryId && { subcategoryId: filter?.subcategoryId }),
  };

  const update: IUpdateBulkProducts = {
    ...(data?.status && { status: data.status }),
    ...(data?.relevance && { relevance: data.relevance }),
  };

  const res = await axiosInstance.put("/products", update, { params });

  console.log(res);
  return res.data;
};
