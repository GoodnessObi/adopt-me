import { QueryStatus } from "@tanstack/react-query";
import { useGetBreedsQuery } from "../store/petApiService";
import { Animal } from "../types/APIResponsesTypes";

export default function useBreedList(animal: Animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) {
    return [[], "loaded"];
  }

  return [breeds ?? [], isLoading ? "loading" : "loaded"] as [
    string[],
    QueryStatus
  ];

  // return [results?.data?.breeds ?? [], results.status] ;
}
