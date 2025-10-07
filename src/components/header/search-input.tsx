"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

type Suggestion = {
  id: string;
  title: string;
};

export default function SearchInput() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim()) {
      router.push("/search?q=" + encodeURIComponent(input));
      setInput("");
      setSuggestions([]);
    }
  }

  useEffect(() => {
    async function getSuggestions() {
      try {
        const res = await fetch(
          `/api/search/suggestion?q=${encodeURIComponent(input)}`
        );
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.suggestions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Suggestion fetch error:", error);
        setSuggestions([]);
      }
    }

    if (input.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(getSuggestions, 500);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input]);

  return (
    <div className="relative w-full max-w-xs">
      <Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={handleKeyDown}
        placeholder="Search for jobs..."
        className="md:w-full w-40"
      />

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto rounded-lg border bg-white dark:bg-[#151515] shadow-lg z-20">
          {suggestions.map((elem) => (
            <Link
              key={elem.id}
              href={`/job/${elem.id}`}
              className="block px-4 py-2 truncate text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#181818] focus:bg-gray-200 focus:outline-none"
            >
              {elem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
