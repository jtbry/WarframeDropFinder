import { useEffect, useState } from 'react';
import ItemApi from '../api/ItemApi';
import StatApi from '../api/StatApi';
import { createPercent } from '../api/Utilities';
import CardBackground from '../components/CardBackground';
import ErrorDisplay from '../components/ErrorDisplay';
import ItemCardPreview from '../components/ItemCardPreview';
import ItemSearch from '../components/ItemSearch';
import LoadingWheel from '../components/LoadingWheel';
import PartialItem from '../models/PartialItem';
import WfdfStats from '../models/WfdfStats';

interface HomeState {
  searchExample?: PartialItem;
  trendingItems?: PartialItem[];
  featuredItems?: PartialItem[];
  trackingBreakdown?: WfdfStats;
  error?: unknown;
  loading: boolean;
}

function HomePage() {
  const [state, setState] = useState<HomeState>({ loading: true });

  useEffect(() => {
    async function updateState() {
      try {
        const searchExample = await ItemApi.GetRandomItems(1);
        const trendingItems = await ItemApi.GetTrendingItems(4);
        const trackingBreakdown = await StatApi.GetWfdfStats();
        let featuredItems = undefined;

        if (trendingItems.length <= 0) {
          featuredItems = await ItemApi.GetRandomItems(4);
        }

        setState({
          searchExample: searchExample[0],
          trendingItems: trendingItems.length > 0 ? trendingItems : undefined,
          featuredItems: featuredItems,
          trackingBreakdown: trackingBreakdown,
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
            <div className="my-8 md:text-center items-center">
              <h2 className="text-2xl text-center md:text-left font-bold">
                Trending Items
              </h2>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {state.trendingItems.map((i) => (
                  <ItemCardPreview
                    className="col-span-2 md:col-span-1"
                    key={i.uniqueName}
                    item={i}
                  />
                ))}
              </div>
            </div>
          )}
          {state.error && (
            <ErrorDisplay>
              <h1 className="text-2xl">The app is having some issues</h1>
              <h2 className="text-xl">Try refreshing or checking back later</h2>
            </ErrorDisplay>
          )}
          {state.featuredItems && (
            <div className="my-8 md:text-center items-center">
              <h2 className="text-2xl text-center md:text-left font-bold">
                Featured Items
              </h2>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {state.featuredItems.map((i) => (
                  <ItemCardPreview
                    className="col-span-2 md:col-span-1"
                    key={i.uniqueName}
                    item={i}
                  />
                ))}
              </div>
            </div>
          )}
          {state.trackingBreakdown && (
            <div className="my-8 w-full md:w-1/2">
              <CardBackground>
                <h2 className="text-2xl text-center md:text-left font-bold">
                  Tracking Breakdown
                </h2>
                <div className="text-center md:text-left">
                  <p className="text-sm">
                    <span className="font-bold">
                      {state.trackingBreakdown.totalItems}
                    </span>{' '}
                    items total
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">
                      {createPercent(
                        state.trackingBreakdown.totalItems,
                        state.trackingBreakdown.tradableItems,
                        0
                      )}
                      %
                    </span>{' '}
                    of items are <span className="font-bold">tradable</span>
                  </p>
                </div>
              </CardBackground>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
