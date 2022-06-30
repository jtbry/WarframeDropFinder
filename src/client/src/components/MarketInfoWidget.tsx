import { useEffect, useState } from 'react';
import MarketApi from '../api/MarketApi';
import { createWfmName } from '../api/Utilities';
import Component from '../models/Component';
import Item from '../models/Item';
import PartialItem from '../models/PartialItem';
import WfmOrder from '../models/WfmOrder';
import CardBackground from './CardBackground';
import ErrorDisplay from './ErrorDisplay';
import LoadingWheel from './LoadingWheel';

interface WfmPriceDisplayProps {
  item: Item | Component;
  parent?: PartialItem;
}

interface WfmPriceDisplayState {
  loading: boolean;
  error?: unknown;
  orders?: WfmOrder[];
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
        setState({ loading: false, orders: orders });
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
            <h2>Number of buy orders</h2>
            <p>{state.orders?.filter((o) => o.order_type === 'buy').length}</p>
          </div>
          <div>
            <h2>Number of sell orders</h2>
            <p>{state.orders?.filter((o) => o.order_type === 'sell').length}</p>
          </div>
        </div>
      </div>
    );
  }

  return <CardBackground className="w-full md:w-1/2">{content}</CardBackground>;
}

export default MarketInfoWidget;
