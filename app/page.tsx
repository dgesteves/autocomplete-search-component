"use client";

import { useLazyQuery } from "@apollo/client";
import { GET_FILTERED_ENTITIES } from "@/services/getFilteredEntities";
import { useState, useCallback } from "react";
import { debounce } from "@/utils/debounce";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Move to a types file if needed
type Entity = {
  id: string;
  name: string;
};

// Move to a types file if needed
type Data = {
  characters: {
    results: Entity[];
  };
  locations: {
    results: Entity[];
  };
  episodes: {
    results: Entity[];
  };
};

// Move to a constants file if needed
const DEBOUNCE_DELAY = 500;
const SEARCH_PLACEHOLDER = "search...";
const ERROR_MESSAGE = "An error occurred";

export default function Home() {
  const [queryTerm, setQueryTerm] = useState("");
  const [results, setResults] = useState<Entity[]>([]);
  const [getFilteredEntities, { loading, error }] = useLazyQuery(
    GET_FILTERED_ENTITIES,
    {
      onCompleted: (data: Data) => {
        const uniqueResults = new Map(
          data.characters.results
            .concat(data.locations.results, data.episodes.results)
            .map((entity: Entity) => [entity.name, entity]),
        );
        const sortedResults = Array.from(uniqueResults.values()).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setResults(sortedResults);
      },
    },
  );

  const debouncedEntities = useCallback(
    debounce((value) => {
      if (value) getFilteredEntities({ variables: { name: value } });
    }, DEBOUNCE_DELAY),
    [],
  );

  const handleChange = (value: string) => {
    setQueryTerm(value);
    if (!value.trim().length) setResults([]);
    debouncedEntities(value);
  };

  const handleSelect = (name: string) => {
    setQueryTerm(name);
    setResults([]);
  };

  if (error) return <div>Error: {error ? error.message : ERROR_MESSAGE}</div>;

  // Add a loading state if needed
  // Add a no results state if needed
  // Add a click outside handler if needed
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        value={queryTerm}
        placeholder={SEARCH_PLACEHOLDER}
        onValueChange={handleChange}
      />
      <CommandList>
        {results.length > 0 && (
          <CommandGroup>
            {results.map((entity) => (
              <CommandItem
                key={entity.name}
                value={entity.name}
                onSelect={() => handleSelect(entity.name)}
              >
                <span>{entity.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
