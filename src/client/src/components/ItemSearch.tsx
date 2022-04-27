import React, { useState } from 'react';
import ItemsApi from '../api/ItemsApi';
import PartialItem from '../models/PartialItem';
import ItemRowPreview from './ItemRowPreview';
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

  function handleSearchResults(results?: PartialItem[], error?: unknown) {
    if (error) {
      setState({ searchError: error });
    } else {
      setState({ searchResults: results });
    }
  }

  function renderResults() {
    let content: JSX.Element | JSX.Element[] | undefined;
    if (state.searchError) {
      console.error(state.searchError);
      if (state.searchError instanceof Error) {
        // Render error message
        content = (
          <div className="mx-auto p-2">
            <p>Sorry... an error occured :(</p>
          </div>
        );
      }
    } else {
      if (state.searchResults) {
        if (state.searchResults.length === 0) {
          // Render no results found message
          content = (
            <div className="mx-auto p-2">
              <p>No results found.</p>
            </div>
          );
        } else {
          // Render search results
          // TODO: display search results over other elements
          content = state.searchResults.map((item) => (
            <ItemRowPreview
              onClick={() => {
                // Clear search results on click (for nav bar)
                // TODO: clear search input on click as well?
                setState({
                  searchResults: undefined,
                });
              }}
              item={item}
              key={item.uniqueName}
            />
          ));
        }
      }
    }

    // Wrap content in results container
    if (content) {
      return (
        <div className="bg-primary-200 rounded-b-md border-primary-400 border-x-2 border-b-2 flex flex-col">
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
