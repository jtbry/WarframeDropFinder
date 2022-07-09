import React, { useEffect, useState } from 'react';
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

  const createResultElement = (result: PartialItem): JSX.Element => {
    return <ItemRowPreview item={result} />;
  };

  return (
    <div>
      <SearchBar
        placeholder={state.searchPlaceholder}
        searchFunc={ItemApi.SearchItemByName}
        createResultElement={createResultElement}
      />
    </div>
  );
}
