import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemApi from '../../api/ItemApi';
import BubbleLabel from '../../components/BubbleLabel';
import CardBackground from '../../components/CardBackground';
import ErrorDisplay from '../../components/ErrorDisplay';
import LoadingWheel from '../../components/LoadingWheel';
import MarketInfoWidget from '../../components/MarketInfoWidget';
import Item from '../../models/Item';
import ComponentTable from './ComponentTable';
import DropSourceTable from './DropSourceTable';
import PatchlogTable from './PatchlogTable';

interface State {
  loading: boolean;
  error?: unknown;
  item?: Item;
}

export default function ItemPage() {
  const [state, setState] = useState<State>({ loading: true });
  const [searchParams] = useSearchParams();
  const uniqueName = searchParams.get('uniqueName');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item: Item = await ItemApi.GetItemByUniqueName(
          uniqueName as string
        );
        setState({ loading: false, item: item });
      } catch (error) {
        console.error('ItemPage', error);
        setState({ loading: false, error: error });
      }
    };

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
  }
  if (state.error || state.item === undefined) {
    return (
      <ErrorDisplay>
        <h1 className="text-2xl">There was an error fetching this item</h1>
        <h2 className="text-xl">
          Try changing your search term or looking for a different item
        </h2>
      </ErrorDisplay>
    );
  }

  const isTradable =
    state.item.tradable || state.item?.components.some((c) => c.tradable);
  return (
    <div className="flex flex-col items-center justify-center mx-2 md:mx-0 space-y-2 mb-2">
      <img
        alt={state.item.name}
        src={`https://cdn.warframestat.us/img/${state.item.imageName}`}
        className="w-48 h-48 text-sm mx-auto m-2 mt-4"
      />
      <CardBackground className="w-full md:w-1/2">
        <div className="flex flex-row space-x-2">
          <h1 className="text-2xl font-bold">{state.item.name}</h1>
          <h1 className="text-sm font-thin self-center">
            ({state.item.category})
          </h1>
        </div>
        {state.item.description !== 'N/A' && (
          <p className="text-sm">{state.item.description}</p>
        )}

        {state.item.wikiaUrl !== '' && (
          <p className="text-sm">
            View the{' '}
            <a
              href={state.item.wikiaUrl}
              target="_blank"
              className="text-blue-400 hover:text-blue-500"
              rel="noopener noreferrer"
            >
              Wikia Page
            </a>
          </p>
        )}

        <div className="mt-2">
          {isTradable && <BubbleLabel>Tradable</BubbleLabel>}
          {state.item.vaulted && <BubbleLabel>Vaulted</BubbleLabel>}
        </div>
      </CardBackground>

      {isTradable && <MarketInfoWidget item={state.item} />}
      <DropSourceTable data={state.item.drops} />
      <ComponentTable data={state.item.components} parent={state.item} />
      <PatchlogTable data={state.item.patchlogs} />
    </div>
  );
}
