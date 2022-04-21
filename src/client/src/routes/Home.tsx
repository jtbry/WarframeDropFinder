import { useEffect, useState } from 'react';
import ItemsApi from '../api/ItemsApi';
import ItemSearch from '../components/ItemSearch';
import LoadingWheel from '../components/LoadingWheel';
import PartialItem from '../models/PartialItem';

interface HomeState {
  searchExample?: PartialItem;
  error?: unknown;
  loading: boolean;
}

function Home() {
  const [state, setState] = useState<HomeState>({ loading: true });

  useEffect(() => {
    async function fetchRandomItem() {
      try {
        const items: PartialItem[] = await ItemsApi.GetRandomItems(1);
        setState({ searchExample: items[0], loading: false });
      } catch (err: unknown) {
        setState({ error: err, loading: false });
      }
    }

    fetchRandomItem();
  }, []);

  let searchPlaceholder = 'Search for an item';
  if (state.loading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoadingWheel />
        </div>
      </div>
    );
  } else {
    if (state.error) {
      console.error(state.error);
    } else if (state.searchExample) {
      searchPlaceholder = `Search for an item, eg. ${state.searchExample.name}`;
    }

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full p-2 md:p-6 md:w-1/2">
          <ItemSearch placeholder={searchPlaceholder} />
        </div>
      </div>
    );
  }
}

export default Home;
