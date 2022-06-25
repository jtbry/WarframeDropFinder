import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ItemApi from '../api/ItemApi';
import { createPercent } from '../api/Utilities';
import CardBackground from '../components/CardBackground';
import DataTable from '../components/DataTable';
import LoadingWheel from '../components/LoadingWheel';
import Component from '../models/Component';
import DropSource from '../models/DropSource';
import Item from '../models/Item';
import Patchlog from '../models/Patchlog';

interface ItemPageState {
  loading: boolean;
  error?: unknown;
  item?: Item;
}

function RenderPatchlogs(data: Patchlog[], uniqueName: string) {
  if (data && data.length > 0) {
    return (
      <CardBackground className="w-full md:w-1/2">
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Patchlogs</h1>
          <DataTable
            data={data}
            keys={['name', 'date']}
            rowsPerPage={5}
            transformFieldValue={{
              date: (value: any) => new Date(value).toLocaleDateString(),
              name: (value: string, root: Patchlog) => (
                <a
                  className="hover:text-blue-400"
                  href={root.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {value}
                </a>
              ),
            }}
          />
        </div>
      </CardBackground>
    );
  }
}

function RenderComponents(data: Component[]) {
  if (data && data.length > 0) {
    return (
      <CardBackground className="w-full md:w-1/2">
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Components</h1>
          <DataTable
            data={data}
            keys={['name', 'itemCount', 'tradable']}
            headerAlias={{ itemCount: 'Item Count' }}
            transformFieldValue={{
              tradable: (value: any) => (value ? 'YES' : 'NO'),
            }}
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

function ItemPage() {
  const [state, setState] = useState<ItemPageState>({ loading: true });
  const [searchParams] = useSearchParams();
  const uniqueName = searchParams.get('uniqueName');

  useEffect(() => {
    async function fetchItem() {
      try {
        const item: Item = await ItemApi.GetItemByUniqueName(
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
    if (state.error || !state.item) {
      if (!state.item) console.error('State item is undefined: ' + state.item);
      if (state.error) console.error(state.error);
      return (
        <div className="flex flex-col text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-60 w-60"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <h1 className="text-2xl">There was an error fetching this item</h1>
          <h2 className="text-xl">
            Try changing your search term or looking for a different item
          </h2>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center mx-4 md:mx-0 space-y-2 mb-2">
          {/* Image and header */}
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

          {RenderDropSources(state.item.drops)}
          {RenderComponents(state.item.components)}
          {RenderPatchlogs(state.item.patchlogs, state.item.uniqueName)}
        </div>
      );
    }
  }
}

export default ItemPage;
