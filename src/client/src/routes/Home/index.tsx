import TrackingBreakdown from './TrackingBreakdown';
import TrendingItems from './TrendingItems';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center mx-2 md:mx-0">
      <div className="w-full md:w-1/2">
        <TrendingItems />
        <TrackingBreakdown />
      </div>
    </div>
  );
}
