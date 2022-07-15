import { useEffect, useState } from 'react';
import MarketApi from '../api/MarketApi';
import { createWfmName } from '../api/Utilities';
import Component from '../models/Component';
import Item from '../models/Item';
import PartialItem from '../models/PartialItem';
import WfmOrder from '../models/WfmOrder';
import WfmPriceData from '../models/WfmPriceData';
import CardBackground from './CardBackground';
import LoadingElement from '../components/LoadingElement';

interface WfmPriceDisplayProps {
  item: Item | Component;
  parent?: PartialItem;
}

interface State {
  loading: boolean;
  error?: unknown;
  orders?: WfmOrder[];
  prices?: WfmPriceData[];
}

export default function MarketInfoWidget({
  item,
  parent,
}: WfmPriceDisplayProps) {
  const [state, setState] = useState<State>({ loading: true });
  const isSet = (item as Item)?.components?.some((c) => c.tradable);

  const wfmItemName = createWfmName(item, parent, isSet);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await MarketApi.GetOrdersForItem(wfmItemName);
        const prices = await MarketApi.GetPricesForItem(wfmItemName);
        setState({ loading: false, orders: orders, prices: prices });
      } catch (error) {
        console.error(error);
        setState({ loading: false, error: error });
      }
    };

    fetchData();
  }, [wfmItemName]);

  let content;
  if (state.loading) {
    content = (
      <div className="text-center justify-center">
        <LoadingElement />
      </div>
    );
  } else if (state.error) {
    return <></>;
  } else {
    content = (
      <div>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">
            Market Data{' '}
            <span className="text-base font-normal">
              from{' '}
              <a
                href={`https://warframe.market/items/${wfmItemName}`}
                target="_blank"
                className="text-blue-400 hover:text-blue-500"
                rel="noopener noreferrer"
              >
                WarframeMarket
              </a>
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 text-sm">
          <div>
            <h2>Total Orders</h2>
            <p>{state.orders?.length}</p>
          </div>
          <div>
            <h2>Total buy orders</h2>
            <p>{state.orders?.filter((o) => o.orderType === 'buy').length}</p>
          </div>
          <div>
            <h2>Total sell orders</h2>
            <p>{state.orders?.filter((o) => o.orderType === 'sell').length}</p>
          </div>
          <div>
            <h2>Min buy price</h2>
            <p>
              {state.prices?.find((pd) => pd.orderType === 'buy')?.minPrice}
            </p>
          </div>
          <div>
            <h2>Max buy price</h2>
            <p>
              {state.prices?.find((pd) => pd.orderType === 'buy')?.maxPrice}
            </p>
          </div>
          <div>
            <h2>Median buy price</h2>
            <p>{state.prices?.find((pd) => pd.orderType === 'buy')?.median}</p>
          </div>
          <div>
            <h2>Min sell price</h2>
            <p>
              {state.prices?.find((pd) => pd.orderType === 'sell')?.minPrice}
            </p>
          </div>
          <div>
            <h2>Max sell price</h2>
            <p>
              {state.prices?.find((pd) => pd.orderType === 'sell')?.maxPrice}
            </p>
          </div>
          <div>
            <h2>Median sell price</h2>
            <p>{state.prices?.find((pd) => pd.orderType === 'sell')?.median}</p>
          </div>
        </div>
      </div>
    );
  }

  return <CardBackground className="w-full md:w-1/2">{content}</CardBackground>;
}
