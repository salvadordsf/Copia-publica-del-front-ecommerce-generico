"use client";

import { useMiniSearch } from "react-minisearch";
import { SearchEmpty } from "./empty-search";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { IProduct } from "@/types/resources/product-type";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import cloudinaryLoader from "@/lib/cloudinary/cloudinary-loader";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useProductsFiltersStore } from "@/features/publics/products/stores/products-filters";
import { Search } from "lucide-react";

export const MiniSearchWrapper = ({
  products,
  isLoading,
}: {
  products: IProduct[];
  isLoading: boolean;
}) => {
  // Controlled value for the search input
  const [searchValue, setSearchValue] = useState("");

  // Whether the input is focused — controls dropdown visibility
  const [isFocused, setIsFocused] = useState(false);

  // Ref for the whole wrapper div — used to detect clicks outside
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Ref for the input — used to imperatively clear its visual value on reset
  const inputRef = useRef<HTMLInputElement>(null);

  // Track current URL path and query params to trigger reset on navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Global product filters store — reset and set search term before navigating
  const { resetFilters, setFilters } = useProductsFiltersStore();

  // Initialize MiniSearch with the products array
  const { search, searchResults, clearSearch, suggestions, autoSuggest } =
    useMiniSearch(products, {
      // Fields to index and search against
      fields: [
        "name",
        "description",
        "category",
        "subcategory",
        "tags",
        "relevance",
      ],
      // Fields to include in each search result object
      storeFields: [
        "id",
        "name",
        "category",
        "subcategory",
        "tags",
        "imageUrls",
        "relevance",
      ],
      searchOptions: {
        // Match results that start with the typed characters
        prefix: true,
        // Allow slight typos (0.25 = low tolerance)
        fuzzy: 0.25,
      },
    });

  // Whenever the URL changes (path or query params), fully reset the searcher
  useEffect(() => {
    handleReset();
  }, [pathname, searchParams]);

  // Listen for clicks anywhere on the document
  // If the click is outside the wrapper, close the dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clears all search state — both React state and the MiniSearch internal state
  // Also imperatively clears the input's displayed value via ref
  const handleReset = () => {
    setSearchValue("");
    setIsFocused(false);
    clearSearch();
    if (inputRef.current) inputRef.current.value = "";
  };

  // Fires on every keystroke — updates state and triggers MiniSearch
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchValue(query);

    if (!query) {
      // If input is empty, clear results and suggestions
      clearSearch();
      return;
    }

    // Run full-text search and auto-suggest in parallel
    search(query);
    autoSuggest(query);
  };

  // Core search action — resets filters, applies search term, and navigates
  // Called both by Enter key and the search button click
  const handleSearch = () => {
    if (!searchValue.trim()) return;

    // Clear any previously applied filters (category, price, sort, etc.)
    resetFilters();

    // Apply only the search term — page resets to "1" internally in the store
    setFilters({ search: searchValue.trim() });

    // Navigate to the products listing page
    // The URL change will trigger the useEffect above and reset the searcher
    router.push("/home/productos");
  };

  // Intercept Enter key on the input to trigger the search action
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleSearch();
  };

  // Derived booleans to control what gets rendered below the input
  // All require isFocused — nothing shows if the user clicked away

  // Show result list only when there are actual results
  const showResults = isFocused && searchResults && searchResults.length > 0;

  // Show empty state when user typed something but got no results
  const showEmpty =
    isFocused &&
    searchValue.length > 0 &&
    (!searchResults || searchResults.length === 0);

  // Show suggestions only when there are no results (fuzzy alternatives)
  const showSuggestions =
    isFocused &&
    suggestions &&
    suggestions.length > 0 &&
    (!searchResults || searchResults.length === 0);

  // While products are loading, render a placeholder skeleton
  if (isLoading) return <Skeleton className="w-full border p-2 rounded-xl" />;

  return (
    // wrapperRef wraps everything so click-outside detection works correctly
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      {/* Input + search button container */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar productos..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          // Mark as focused when user clicks/tabs into the input
          onFocus={() => setIsFocused(true)}
          disabled={isLoading}
          // pr-9 leaves space for the search icon button on the right
          className="w-full border p-2 pr-9 rounded-xl bg-white"
        />

        {/* Search icon button — triggers the same action as Enter */}
        <button
          onClick={handleSearch}
          disabled={!searchValue.trim() || isLoading}
          className="absolute right-2 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Results dropdown — sorted by custom relevance field, capped at 8 */}
      {showResults && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-xl p-3 z-50">
          <ul className="divide-y">
            {[...searchResults]
              .sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0))
              .slice(0, 8)
              .map((res) => (
                // Clicking a result navigates to the product detail page
                // onClick resets the searcher immediately without waiting for URL change
                <Link
                  key={res.id}
                  href={`/home/producto/${slugify(res.name)}?id=${res.id}`}
                  onClick={handleReset}
                >
                  <li className="relative py-2 cursor-pointer hover:bg-neutral-100 px-2 rounded flex items-center gap-3">
                    <Image
                      src={
                        res.imageUrls?.[0] ??
                        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      width={40}
                      height={40}
                      alt={res.name}
                      className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                      loader={cloudinaryLoader}
                      sizes="40px"
                      quality={60}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium truncate">{res.name}</span>
                      <div className="text-xs opacity-60 truncate">
                        {res.category.name} • {res.subcategory.name}
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      )}

      {/* Empty state — shown when there's a query but zero results */}
      {showEmpty && <SearchEmpty />}
    </div>
  );
};
