import React, { useEffect, useState } from 'react';
import ItemApi from '../api/ItemApi';
import PartialItem from '../models/PartialItem';
import ItemRowPreview from './ItemRowPreview';
import SearchBar from './SearchBar';

interface ItemSearchState {
  searchPlaceholder: string;
  searchResults?: PartialItem[];
  searchError?: unknown;
}

function ItemSearch({ provideExample }: { provideExample?: boolean }) {
  const [state, setState] = useState<ItemSearchState>({
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

export default ItemSearch;
