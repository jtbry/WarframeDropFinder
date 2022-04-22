import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemsApi from '../api/ItemsApi';
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
        return <h1>{state.item.name}</h1>;
      } else {
        return <h1>No item found</h1>;
      }
    }
  }
}

export default ItemPage;
