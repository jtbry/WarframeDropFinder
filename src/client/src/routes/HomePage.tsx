import { useEffect, useState } from 'react';
import ItemsApi from '../api/ItemsApi';
import ItemCardPreview from '../components/ItemCardPreview';
import ItemSearch from '../components/ItemSearch';
import LoadingWheel from '../components/LoadingWheel';
import PartialItem from '../models/PartialItem';

interface HomeState {
  searchExample?: PartialItem;
  trendingItems?: PartialItem[];
  error?: unknown;
  loading: boolean;
}

function HomePage() {
  const [state, setState] = useState<HomeState>({ loading: true });

  useEffect(() => {
    async function updateState() {
      try {
        const searchExample = await ItemsApi.GetRandomItems(1);
        const trendingItems = await ItemsApi.GetTrendingItems(4);
        setState({
          searchExample: searchExample[0],
          trendingItems: trendingItems.length > 0 ? trendingItems : undefined,
          loading: false,
        });
      } catch (error) {
        setState({ error: error, loading: false });
      }
    }

    updateState();
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
          {state.trendingItems && (
            <div className="my-8">
              <h2 className="text-2xl font-bold">Trending Items</h2>
              <div className="pt-4 grid grid-cols-4 space-x-4">
                {state.trendingItems.map((i) => (
                  <ItemCardPreview key={i.uniqueName} item={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
