import React, { useState } from "react";
import PartialItem from "../models/PartialItem";

interface ItemSearchBarProps {
  placeholder: string;
  searchSource: PartialItem[] | ((name: string) => Promise<PartialItem[]>);
}

interface ItemSearchBarState {
  typingTimeout?: NodeJS.Timeout;
  searchResults?: PartialItem[];
  searchError?: unknown;
}

function ItemSearchBar(props: ItemSearchBarProps) {
  const [state, setState] = useState<ItemSearchBarState>({});

  function executeSearch(itemName: string) {
    if (typeof props.searchSource == "function") {
      props.searchSource(itemName).then(results => {
        setState({ searchResults: results });
      }).catch(err => {
        setState({ searchError: err });
      });
    } else {
      const searchRegex = new RegExp(itemName, "i");
      const results = props.searchSource.filter(i => i.name.match(searchRegex))
      setState({ searchResults: results });
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    setState({
      ...state,
      typingTimeout: setTimeout(() => {
        executeSearch(event.target.value);
      }, 500)
    })
  }

  return (
    <div className="relative mx-auto">
      <input
        type="text"
        className="w-full border-2 border-slate-900 bg-slate-600 h-10 px-5 pr-16 rounded-lg text-lg focus:outline-none"
        placeholder={props.placeholder}
        onChange={onInputChange}
      />
      {/* TODO: search results */}
      {state.searchResults && state.searchResults.map(item => (<p>{item.name}</p>))}
    </div>
  );
}

export default ItemSearchBar;
