import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ItemApi from '../api/ItemApi';
import PartialItem from '../models/PartialItem';
import ItemRowPreview from './ItemRowPreview';
import SearchBar from './SearchBar';

interface ItemSearchProps {
  provideExample?: boolean;
}

interface State {
  searchPlaceholder: string;
  searchResults?: PartialItem[];
  searchError?: unknown;
}

export default function ItemSearch({ provideExample }: ItemSearchProps) {
  const [state, setState] = useState<State>({
    searchPlaceholder: 'Search for an item',
  });
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    if (provideExample) {
      // Provide a sample search result
      const fetchSearchExample = async () => {
        try {
          const searchExample = await ItemApi.GetRandomItems(1);
          setState((s) => ({
            ...s,
            searchPlaceholder: `Search for an item, eg. ${searchExample[0].name}`,
          }));
        } catch (err) {
          console.error(`Search provideExample ${err}`);
        }
      };

      fetchSearchExample();
    }
  }, [provideExample]);

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', eventListener);
    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  });

  const createResultElement = (result: PartialItem): JSX.Element => {
    return <ItemRowPreview item={result} />;
  };

  return (
    <div>
      <SearchBar
        placeholder={state.searchPlaceholder}
        searchFunc={ItemApi.SearchItemByName}
        createResultElement={createResultElement}
        inputRef={inputRef}
        endDectorator={
          <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
            <span className="border rounded-sm text-sm p-1 dark:text-gray-400 border-gray-400">
              ESC
            </span>
          </div>
        }
      />
    </div>
  );
}
