import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemsApi from '../api/ItemsApi';
import CardBackground from '../components/CardBackground';
import LoadingWheel from '../components/LoadingWheel';
import Item from '../models/Item';

interface ItemPageState {
  loading: boolean;
  error?: unknown;
  item?: Item;
}

function ItemPage() {
  const [state, setState] = useState<ItemPageState>({ loading: true });
  const [searchParams] = useSearchParams();
  const uniqueName = searchParams.get('uniqueName');

  useEffect(() => {
    async function fetchItem() {
      try {
        const item: Item = await ItemsApi.GetItemByUniqueName(
          uniqueName as string
        );
        setState({ loading: false, item: item });
      } catch (error) {
        setState({ loading: false, error: error });
      }
    }

    fetchItem();
  }, [uniqueName]);

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
      // TODO: show error
      return <h1>Error</h1>;
    } else {
      if (state.item) {
        return (
          <div className="flex flex-col items-center justify-center mx-4 md:mx-0">
            <img
              alt={state.item.name}
              src={`https://cdn.warframestat.us/img/${state.item.imageName}`}
              className="w-48 h-48 text-sm mx-auto m-2"
            />
            <CardBackground className="w-full md:w-1/2">
              <div className="flex space-x-2">
                <h1 className="text-2xl font-bold">{state.item.name}</h1>
                <h1 className="text-sm font-thin self-center">
                  {state.item.category}
                </h1>
              </div>
              <p className="text-sm">{state.item.description}</p>
            </CardBackground>
          </div>
        );
      } else {
        return <h1>No item found</h1>;
      }
    }
  }
}

export default ItemPage;
