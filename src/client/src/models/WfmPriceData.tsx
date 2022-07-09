interface WfmPriceData {
  datetime: Date;
  volume: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  median: number;
  orderType: string;
}

export default WfmPriceData;
