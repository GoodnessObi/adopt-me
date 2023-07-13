import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import useBreedList from "../hooks/UseBreedList";
import { Animal, Pet } from "../types/APIResponsesTypes";
import Results from "../components/Results";
import { all } from "../store/searchParamsSlice";
import { useSearchQuery } from "../store/petApiService";
// import fetchSearch from "../api/fetchSearch";

const animals: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const dispatch = useDispatch();
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const requestParams = useSelector((state) => state.searchParams.value);

  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  // const results = useQuery(["search", requestParams], fetchSearch);
  // const pets = results?.data?.pets ?? [];
  let { data: pets } = useSearchQuery(requestParams);
  pets = pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: (formData.get("animal")?.toString() as Animal) ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="h-[200px] w-[200px] overflow-hidden rounded-[50%]">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            placeholder="location"
            className="search-input"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {animals.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            className="search-input grayed-out-disabled"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
