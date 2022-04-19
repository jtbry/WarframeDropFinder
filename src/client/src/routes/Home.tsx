import { useEffect, useState } from "react";
import ItemsApi from "../api/ItemsApi";
import SearchBar from "../components/SearchBar";
import PartialItem from "../models/PartialItem";

function Home() {
  const [searchExample, setSearchExample] = useState<PartialItem>();

  useEffect(() => {
    async function fetchRandomItem() {
      const items: PartialItem[] = await ItemsApi.GetRandomItems(1);
      setSearchExample(items[0]);
    }

    fetchRandomItem();
  }, []);

  if (searchExample == null) {
    return <div>Loading...</div>;
  } else {
    return (
      <SearchBar
        placeholderText={`Search an item eg. ${searchExample.name}`}
        searchFunc={ItemsApi.SearchItemByName}
        displayFunc={(result: PartialItem) => {
          return <p>{result.name}</p>
        }}
      />
    );
  }
}

export default Home;
