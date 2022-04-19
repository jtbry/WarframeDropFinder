import React, { useState } from "react";

interface SearchBarProps {
  placeholderText: string;
  searchFunc: (searchTerm: string) => Promise<object[]>;
  displayFunc: (result: any) => JSX.Element;
}

interface SearchBarState {
  searchTypingTimeout: any;
  searchResults: any[];
}

function SearchBar(props: SearchBarProps) {
  const [state, setState] = useState<SearchBarState>({
    searchTypingTimeout: null,
    searchResults: []
  })

  async function executeSearch(searchTerm: string) {
    const results = await props.searchFunc(searchTerm);
    setState({
      ...state,
      searchResults: results
    });
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (state.searchTypingTimeout) clearTimeout(state.searchTypingTimeout);
    setState({
      ...state,
      searchTypingTimeout: setTimeout(() => executeSearch(event.target.value), 500)
    })
  }

  return (
    <div className="p-6 justify-center text-center">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          type="text"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-lg focus:outline-none"
          placeholder={props.placeholderText}
          onChange={onInputChange}
        />
        {state.searchResults.length > 0 && state.searchResults.map(result => props.displayFunc(result))}
      </div>
    </div>
  );
}

export default SearchBar;
