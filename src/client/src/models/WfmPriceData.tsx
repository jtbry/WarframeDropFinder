interface WfmPriceData {
  timestamp: Date;
  volume: number;
  min_price: number;
  max_price: number;
  avg_price: number;
  median: number;
  order_type: string;
}

export default WfmPriceData;
