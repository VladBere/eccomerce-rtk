// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductQueryParams } from "..";

// Define a service using a base URL and expected endpoints
export const platziApi = createApi({
  reducerPath: "platziApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Partial<ProductQueryParams>>({
      query: ({ limit, offset, title }) => {
        let searchString = `/products?limit=${limit}&offset=${offset}`;
        title ? (searchString += `&title=${title}`) : null;
        return searchString;
      },
    }),
    addProduct: builder.mutation<Product, Product>({
      query: (data) => {
        return {
          url: "/products",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useAddProductMutation } = platziApi;
