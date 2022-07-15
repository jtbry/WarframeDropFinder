import { useEffect, useState } from 'react';
import StatApi from '../../api/StatApi';
import { createPercent } from '../../api/Utilities';
import CardBackground from '../../components/CardBackground';
import WfdfStats from '../../models/WfdfStats';

interface State {
  loading: boolean;
  error?: unknown;
  trackingBreakdown?: WfdfStats;
}

export default function TrackingBreakdown() {
  const [state, setState] = useState<State>({ loading: true });

  useEffect(() => {
    const fetchTrackingBreakdown = async () => {
      try {
        const trackingBreakdown = await StatApi.GetWfdfStats();
        setState({
          loading: false,
          trackingBreakdown: trackingBreakdown,
        });
      } catch (error) {
        console.error('TrackingBreakdown', error);
        setState({ loading: false, error: error });
      }
    };
    fetchTrackingBreakdown();
  }, []);

  if (state.trackingBreakdown) {
    return (
      <div className="my-8 w-full md:w-1/2">
        <CardBackground>
          <h2 className="text-2xl text-center md:text-left font-bold">
            Tracking Breakdown
          </h2>
          <div className="text-center md:text-left">
            <p className="text-sm">
              <span className="font-bold">
                {state.trackingBreakdown.totalItems}
              </span>{' '}
              items total
            </p>
            <p className="text-sm">
              <span className="font-bold">
                {createPercent(
                  state.trackingBreakdown.totalItems,
                  state.trackingBreakdown.tradableItems,
                  0
                )}
                %
              </span>{' '}
              of items are <span className="font-bold">tradable</span>
            </p>
          </div>
        </CardBackground>
      </div>
    );
  }
  return <></>;
}
