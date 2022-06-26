import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ComponentApi from '../api/ComponentApi';
import LoadingWheel from '../components/LoadingWheel';
import ComponentWithItems from '../models/ComponentWithItems';
import ErrorDisplay from '../components/ErrorDisplay';
import CardBackground from '../components/CardBackground';
import DropSource from '../models/DropSource';
import DataTable from '../components/DataTable';
import { createPercent } from '../api/Utilities';
import PartialItem from '../models/PartialItem';

interface ComponentPageState {
  loading: boolean;
  error?: unknown;
  data?: ComponentWithItems;
}

function RenderCraftableItems(
  data: PartialItem[],
  navigate: (url: string) => any
) {
  if (data && data.length > 0) {
    return (
      <CardBackground className="w-full md:w-1/2">
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Craftable Items</h1>
          <DataTable
            data={data}
            keys={['imageName', 'name', 'category']}
            transformFieldValue={{
              imageName: (value: string, root: PartialItem) => (
                <img
                  alt={root.name}
                  src={`https://cdn.warframestat.us/img/${value}`}
                  className="w-10 h-10 text-sm"
                />
              ),
            }}
            rowsPerPage={10}
            headerAlias={{ imageName: 'Image' }}
            clickableRows={(row: PartialItem) =>
              navigate(`/Item?uniqueName=${row.uniqueName}`)
            }
          />
        </div>
      </CardBackground>
    );
  }
}

function RenderDropSources(data?: DropSource[]) {
  if (data && data.length > 0) {
    return (
      <CardBackground className="w-full md:w-1/2">
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Drop Sources</h1>
          <DataTable
            data={data.sort((a, b) => b.chance - a.chance)}
            keys={['chance', 'location', 'type']}
            transformFieldValue={{
              chance: (value: number) => `${createPercent(1, value, 2)}%`,
            }}
            rowsPerPage={10}
            headerAlias={{ location: 'Source' }}
          />
        </div>
      </CardBackground>
    );
  }
}

function ComponentPage() {
  const [state, setState] = useState<ComponentPageState>({ loading: true });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const uniqueName = searchParams.get('uniqueName');
  const parentUniqueName = searchParams.get('parent');

  useEffect(() => {
    async function fetchComponent() {
      try {
        const data: ComponentWithItems =
          await ComponentApi.ComponentByUniqueName(uniqueName as string);
        setState({ loading: false, data: data });
      } catch (error) {
        setState({ loading: false, error: error });
      }
    }

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
  } else {
    if (state.error || !state.data?.component) {
      if (!state.data?.component)
        console.error('State component is undefined: ' + state.data?.component);
      if (state.error) console.error(state.error);
      return (
        <ErrorDisplay>
          <h1 className="text-2xl">There was an error fetching this item</h1>
          <h2 className="text-xl">
            Try changing your search term or looking for a different item
          </h2>
        </ErrorDisplay>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center mx-4 md:mx-0 space-y-2 mb-2">
          {/* Image and header */}
          <img
            alt={state.data.component.name}
            src={`https://cdn.warframestat.us/img/${state.data.component.imageName}`}
            className="w-48 h-48 text-sm mx-auto m-2"
          />
          <CardBackground className="w-full md:w-1/2">
            <div className="flex space-x-2">
              <h1 className="text-2xl font-bold">
                {state.data.component.name}
              </h1>
            </div>
            <p className="text-sm">{state.data.component.description}</p>
          </CardBackground>

          {RenderDropSources(state.data?.component.drops)}
          {RenderCraftableItems(state.data.items, (url: string) =>
            navigate(url)
          )}
        </div>
      );
    }
  }
}

export default ComponentPage;
