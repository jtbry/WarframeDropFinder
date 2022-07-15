import { useEffect, useState } from 'react';
import ItemApi from '../../api/ItemApi';
import ItemCardPreview from '../../components/ItemCardPreview';
import LoadingElement from '../../components/LoadingElement';
import PartialItem from '../../models/PartialItem';

interface State {
  loading: boolean;
  trendingItems?: PartialItem[];
  error?: unknown;
}

export default function TrendingItems() {
  const [state, setState] = useState<State>({ loading: true });

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const trendingItems = await ItemApi.GetTrendingItems(4, true);
        setState({
          loading: false,
          trendingItems: trendingItems,
        });
      } catch (error) {
        console.error('FeaturedItemDisplay', error);
        setState({ loading: false, error: error });
      }
    };
    fetchTrendingItems();
  }, []);

  if (state.loading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoadingElement />
        </div>
      </div>
    );
  }
  if (state.error) {
    return <></>;
  }

  return (
    <div className="my-8 md:text-center items-center">
      <h2 className="text-2xl text-center md:text-left font-bold">
        Trending Items
      </h2>
      <div className="grid grid-cols-4 md:grid-flow-col md:auto-cols-max justify-items-stretch gap-4 mt-2">
        {state.trendingItems &&
          state.trendingItems.map((i) => (
            <ItemCardPreview
              className="col-span-2"
              key={i.uniqueName}
              item={i}
            />
          ))}
      </div>
    </div>
  );
}
