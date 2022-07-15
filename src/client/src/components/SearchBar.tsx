import { useState } from 'react';

interface SearchBarProps<T> {
  placeholder: string;
  searchFunc: (searchTerm: string) => Promise<T[]>;
  createResultElement: (result: T) => JSX.Element;
  inputRef?: React.RefObject<HTMLInputElement>;
  endDectorator?: JSX.Element;
}

interface SearchBarState<T> {
  typingTimeout?: NodeJS.Timeout;
  searchValue?: string;
  searchResults?: T[];
  searchError?: unknown;
}

export default function SearchBar<T>(props: SearchBarProps<T>) {
  const { placeholder, searchFunc, createResultElement } = props;
  const [state, setState] = useState<SearchBarState<T>>({});

  const executeSearch = (searchTerm: string) => {
    // Don't search empty strings, just clear the results
    if (searchTerm === '') {
      setState({});
    } else {
      searchFunc(searchTerm)
        .then((results) => setState({ searchResults: results }))
        .catch((err) => setState({ searchError: err }));
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state.typingTimeout) {
      clearTimeout(state.typingTimeout);
    }
    setState({
      ...state,
      searchValue: event.target.value,
      typingTimeout: setTimeout(() => {
        executeSearch(event.target.value);
      }, 500),
    });
  };

  let searchResultDisplay;
  let roundedClassName = 'rounded-lg';
  if (state.searchResults) {
    roundedClassName = 'rounded-t-lg';
    if (state.searchResults.length === 0) {
      searchResultDisplay = (
        <h1 className="text-center p-2">No results found</h1>
      );
    } else {
      searchResultDisplay = state.searchResults.map((result, idx) => (
        <div key={idx} onClick={() => setState({ searchValue: '' })}>
          {createResultElement(result)}
        </div>
      ));
    }
  }
  if (state.searchError) {
    console.error('Search error: ', state.searchError);
    roundedClassName = 'rounded-t-lg';
    searchResultDisplay = (
      <h1 className="text-center p-2">There was an error</h1>
    );
  }

  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          className={`border-primary-400 dark:border-primary-900 bg-primary-50 dark:bg-primary-600 text-md focus:outline-none block p-3 pl-10 w-full text-gray-900 ${roundedClassName} border  dark:placeholder-gray-400 dark:text-white`}
          value={state.searchValue}
          placeholder={placeholder}
          onChange={onInputChange}
          ref={props.inputRef}
        />
        {props.endDectorator}
      </div>
      {searchResultDisplay && (
        <div className="border-primary-400 dark:border-primary-900 bg-primary-50 dark:bg-primary-600 text-md focus:outline-none block w-full text-gray-900 rounded-b-lg border  dark:placeholder-gray-400 dark:text-white relative z-10">
          {searchResultDisplay}
        </div>
      )}
    </form>
  );
}
