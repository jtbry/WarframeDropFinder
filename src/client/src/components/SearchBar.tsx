import { useState } from 'react';
import { isAsyncFunction } from '../api/Utilities';

export interface SearchBarProps<T> {
  placeholder: string;
  seamlessResults?: boolean;
  searchFunc: (searchTerm: string) => Promise<T[]> | T[];
  resultsCallback: (results: T[] | unknown) => void;
}

interface SearchBarState {
  typingTimeout?: NodeJS.Timeout;
}

function SearchBar<T>(props: SearchBarProps<T>) {
  const { placeholder, seamlessResults, searchFunc, resultsCallback } = props;
  const [state, setState] = useState<SearchBarState>({});

  function executeSearch(searchTerm: string) {
    // Don't search empty strings, just clear the results
    if (searchTerm === '') resultsCallback(undefined);
    else if (isAsyncFunction(searchFunc)) {
      const asyncSearchFunc = searchFunc as (
        searchTerm: string
      ) => Promise<T[]>;
      asyncSearchFunc(searchTerm).then(resultsCallback).catch(resultsCallback);
    } else {
      resultsCallback(searchFunc(searchTerm));
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    setState({
      ...state,
      typingTimeout: setTimeout(() => {
        executeSearch(event.target.value);
      }, 500),
    });
  }

  return (
    <div className="relative mx-auto">
      <input
        type="text"
        className={`w-full border-primary-900 bg-primary-600 h-10 px-5 pr-16 text-lg focus:outline-none ${
          seamlessResults
            ? 'border-2 border-b-primary-700 rounded-t-md'
            : 'border-2 rounded-md'
        }`}
        placeholder={placeholder}
        onChange={onInputChange}
      />
    </div>
  );
}

export default SearchBar;
