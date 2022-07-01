import { useEffect, useState } from 'react';
import MarketApi from '../api/MarketApi';
import { createWfmName } from '../api/Utilities';
import Component from '../models/Component';
import Item from '../models/Item';
import PartialItem from '../models/PartialItem';
import WfmOrder from '../models/WfmOrder';
import WfmPriceData from '../models/WfmPriceData';
import CardBackground from './CardBackground';
import LoadingWheel from './LoadingWheel';

interface WfmPriceDisplayProps {
  item: Item | Component;
  parent?: PartialItem;
}

interface WfmPriceDisplayState {
  loading: boolean;
  error?: unknown;
  orders?: WfmOrder[];
  prices?: WfmPriceData[];
}

function MarketInfoWidget(props: WfmPriceDisplayProps) {
  const { item } = props;
  const [state, setState] = useState<WfmPriceDisplayState>({ loading: true });
  const isSet = (item as Item).components?.find((c) => c.tradable)
    ? true
    : false;

  const wfmItemName = createWfmName(item, props.parent, isSet);
  useEffect(() => {
    async function fetchData() {
      try {
        const orders = await MarketApi.GetOrdersForItem(wfmItemName);
        const prices = await MarketApi.GetPriceDataForItem(wfmItemName);
        setState({ loading: false, orders: orders, prices: prices });
      } catch (error) {
        console.error(error);
        setState({ loading: false, error: error });
      }
    }

    fetchData();
  }, [wfmItemName]);

  let content;
  if (state.loading) {
    content = <LoadingWheel />;
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
            <p>{state.orders?.filter((o) => o.order_type === 'buy').length}</p>
          </div>
          <div>
            <h2>Total sell orders</h2>
            <p>{state.orders?.filter((o) => o.order_type === 'sell').length}</p>
          </div>
          <div>
            <h2>Min buy price</h2>
            <p>
              {state.prices?.find((pd) => pd.order_type === 'buy')?.min_price}
            </p>
          </div>
          <div>
            <h2>Max buy price</h2>
            <p>
              {state.prices?.find((pd) => pd.order_type === 'buy')?.max_price}
            </p>
          </div>
          <div>
            <h2>Median buy price</h2>
            <p>{state.prices?.find((pd) => pd.order_type === 'buy')?.median}</p>
          </div>
          <div>
            <h2>Min sell price</h2>
            <p>
              {state.prices?.find((pd) => pd.order_type === 'sell')?.min_price}
            </p>
          </div>
          <div>
            <h2>Max sell price</h2>
            <p>
              {state.prices?.find((pd) => pd.order_type === 'sell')?.max_price}
            </p>
          </div>
          <div>
            <h2>Median sell price</h2>
            <p>
              {state.prices?.find((pd) => pd.order_type === 'sell')?.median}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <CardBackground className="w-full md:w-1/2">{content}</CardBackground>;
}

export default MarketInfoWidget;
