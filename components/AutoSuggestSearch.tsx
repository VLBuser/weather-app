"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Loader } from "lucide-react";

import { CityType, findCityByName } from "@/api";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface AutoSuggestSearchProps {
  onSelect: (city: CityType) => void;
}

export const AutoSuggestSearch: React.FC<AutoSuggestSearchProps> = ({
  onSelect,
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedPrompt = useDebounce(prompt, 500);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: cities, isLoading } = useQuery({
    queryKey: ["cities", debouncedPrompt],
    queryFn: () => findCityByName(debouncedPrompt),
    enabled: debouncedPrompt.length > 1,
  });

  const handleSelect = (city: CityType) => {
    setPrompt("");
    setSelectedIndex(null);
    setIsOpen(false);
    onSelect(city);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (cities && cities.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [cities]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter city..."
        className="w-full border border-gray-400 rounded-md p-2 cursor-text"
      />

      {isOpen && cities && cities.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-background border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {cities.map((city: CityType, idx: number) => (
            <li
              key={`${city.name}-${city.lat}-${city.lon}`}
              onClick={() => handleSelect(city)}
              className={`cursor-pointer px-3 py-2 hover:bg-white/10 ${
                selectedIndex === idx ? "bg-white/20" : ""
              }`}
            >
              {city.name}, {city.state ? city.state + "," : ""} {city.country}
            </li>
          ))}
        </ul>
      )}

      {isLoading && (
        <p className="absolute top-[12.5%] right-2 mt-1 text-gray-500 text-sm flex items-center gap-1">
          <Loader className="animate-spin w-6 h-6" />
        </p>
      )}
    </div>
  );
};

export default AutoSuggestSearch;
