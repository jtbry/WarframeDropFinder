import React, { useState } from 'react';
import ItemsApi from '../api/ItemsApi';
import PartialItem from '../models/PartialItem';
import SearchBar from './SearchBar';

interface ItemSearchProps {
  placeholder: string;
}

interface ItemSearchState {
  searchResults?: PartialItem[];
  searchError?: unknown;
}

function ItemSearch(props: ItemSearchProps) {
  const [state, setState] = useState<ItemSearchState>({});

  function handleSearchResults(results: PartialItem[] | unknown) {
    if (Array.isArray(results)) {
      setState({
        searchResults: results,
        searchError: undefined,
      });
    } else {
      setState({
        searchResults: undefined,
        searchError: results,
      });
    }
  }

  function renderResults() {
    let content: JSX.Element | JSX.Element[] | undefined;
    if (state.searchError) {
      console.error(state.searchError);
      if (state.searchError instanceof Error) {
        // Render error message
        content = <div>An error occurred.</div>;
      }
    } else {
      if (state.searchResults) {
        if (state.searchResults.length === 0) {
          // Render no results found message
          content = <div>No results found.</div>;
        } else {
          // Render search results
          content = state.searchResults.map((item) => (
            <p key={item.uniqueName}>{item.name}</p>
          ));
        }
      }
    }

    // Wrap content in results container
    if (content) {
      return (
        <div className="bg-slate-600 p-4 rounded-b-md border-slate-900 border-x-2 border-b-2 flex flex-col">
          {content}
        </div>
      );
    }
  }

  const makeSeamless =
    state.searchResults !== undefined || state.searchError !== undefined;

  return (
    <div>
      <SearchBar
        {...props}
        searchFunc={ItemsApi.SearchItemByName}
        resultsCallback={handleSearchResults}
        seamlessResults={makeSeamless}
      />
      {renderResults()}
    </div>
  );
}

export default ItemSearch;
