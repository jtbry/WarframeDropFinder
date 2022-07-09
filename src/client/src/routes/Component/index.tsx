import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ComponentApi from '../../api/ComponentApi';
import BubbleLabel from '../../components/BubbleLabel';
import CardBackground from '../../components/CardBackground';
import ErrorDisplay from '../../components/ErrorDisplay';
import LoadingWheel from '../../components/LoadingWheel';
import MarketInfoWidget from '../../components/MarketInfoWidget';
import ComponentWithItems from '../../models/ComponentWithItems';
import CraftableItems from './CraftableItems';
import DropSourceTable from './DropSourceTable';

interface State {
  loading: boolean;
  error?: unknown;
  data?: ComponentWithItems;
}

export default function ComponentPage() {
  const [state, setState] = useState<State>({ loading: true });
  const [searchParams] = useSearchParams();
  const uniqueName = searchParams.get('uniqueName');
  const parentUniqueName = searchParams.get('parent');

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const data: ComponentWithItems =
          await ComponentApi.GetComponentByUniqueName(uniqueName as string);
        setState({ loading: false, data: data });
      } catch (error) {
        console.error('ComponentPage', error);
        setState({ loading: false, error: error });
      }
    };

    fetchComponent();
  }, [uniqueName, parentUniqueName]);

  if (state.loading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoadingWheel />
        </div>
      </div>
    );
  }
  if (state.error || !state.data) {
    return (
      <ErrorDisplay>
        <h1 className="text-2xl">There was an error fetching this item</h1>
        <h2 className="text-xl">
          Try changing your search term or looking for a different item
        </h2>
      </ErrorDisplay>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mx-4 md:mx-0 space-y-2 mb-2">
      <img
        alt={state.data.component.name}
        src={`https://cdn.warframestat.us/img/${state.data.component.imageName}`}
        className="w-48 h-48 text-sm mx-auto m-2"
      />
      <CardBackground className="w-full md:w-1/2">
        <div className="flex space-x-2">
          <h1 className="text-2xl font-bold">{state.data.component.name}</h1>
        </div>
        <p className="text-sm">{state.data.component.description}</p>
        {state.data.component.tradable && <BubbleLabel>Tradable</BubbleLabel>}
      </CardBackground>

      {state.data.component.tradable && (
        <MarketInfoWidget
          item={state.data.component}
          parent={state.data.items.find(
            (i) => i.uniqueName === parentUniqueName
          )}
        />
      )}
      <DropSourceTable data={state.data.component.drops} />
      <CraftableItems data={state.data.items} />
    </div>
  );
}
