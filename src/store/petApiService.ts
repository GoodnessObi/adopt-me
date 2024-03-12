import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Animal, Pet } from "../types/APIResponsesTypes";
import { searchState } from "./searchParamsSlice";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query<Pet, string>({
      query: (id) => ({ url: "pets", params: { id } }),
      transformResponse: (response: { pets: Pet[] }) => response.pets[0],
    }),
    getBreeds: builder.query<Pet[], Animal>({
      query: (animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response: { breeds: Pet[] }) => response.breeds,
    }),
    search: builder.query<Pet[], searchState>({
      query: ({ animal, location, breed }) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response: { pets: Pet[] }) => response.pets,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
