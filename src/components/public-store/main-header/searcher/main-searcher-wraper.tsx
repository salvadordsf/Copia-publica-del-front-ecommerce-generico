import { useMiniSearch } from "react-minisearch";
import { SearchEmpty } from "./empty-search";
import { useState } from "react";

export const MiniSearchWrapper = ({
  products,
  isLoading,
}: {
  products: any[];
  isLoading: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { search, searchResults, clearSearch, suggestions, autoSuggest } =
    useMiniSearch(products, {
      fields: ["name", "description", "category", "subcategory", "tags"],
      storeFields: ["id", "name", "category", "subcategory", "tags"],
      searchOptions: {
        prefix: true,
        fuzzy: 0.25,
      },
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchValue(query);

    if (!query) {
      clearSearch();
      return;
    }

    search(query);
    autoSuggest(query);

    console.log("searchResults:", searchResults);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Buscar productos..."
        onChange={handleChange}
        disabled={isLoading}
        className="w-full border p-2 rounded-xl bg-white"
      />

      {searchResults && searchResults.length > 0 ? (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-xl p-3 z-50">
          <ul className="divide-y">
            {searchResults &&
              searchResults.slice(0, 8).map((res) => (
                <li
                  key={res.id}
                  className="py-2 cursor-pointer hover:bg-neutral-100 px-2 rounded"
                >
                  <span className="font-medium">{res.name}</span>
                  <div className="text-xs opacity-60">
                    {res.category} • {res.subcategory}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        searchValue.length > 0 && <SearchEmpty />
      )}

      {suggestions &&
        suggestions.length > 0 &&
        searchResults &&
        searchResults.length === 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-xl p-3 z-50">
            <p className="text-sm font-semibold mb-2 opacity-70">
              ¿Quisiste decir...?
            </p>
            <ul className="divide-y">
              {suggestions.slice(0, 5).map((s, i) => (
                <li key={i} className="py-2 px-2 hover:bg-neutral-100 rounded">
                  {s.suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
