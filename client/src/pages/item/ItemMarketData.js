import React from 'react'
import { Grid } from '@material-ui/core'
import CollapsingCard from '../../components/CollapsingCard';

export default function ItemMarketData(props) {
  const marketData = props.marketData;
  const dataTime = new Date(marketData.lastUpdate)
  dataTime.setHours(dataTime.getHours() -1, 0, 0, 0)
  return(
    <CollapsingCard cardStyle={{display: 'flex', padding: '0px', marginTop: '1rem'}}
      contentStyle={{paddingTop: '0px'}}
      title={<><h1>Data from <a target='_blank' rel='noreferrer' href={`https://warframe.market/items/${marketData.wfmName}`}>WarframeMarket</a></h1></>}
      content={
        <div>
          <p>Data from {dataTime.toLocaleString()}</p>
          <Grid container style={{marginTop: '-1rem'}}>
            <Grid item xs={6}>
              <h3>Sell Orders</h3>
              {marketData.sell ? 
              <><p>{marketData.sell.volume} orders</p>
              <p>{marketData.sell.min} min. price</p>
              <p>{marketData.sell.max} max price</p>
              <p>{marketData.sell.avg} avg price</p></> : <p>Issue with sell data</p>}
            </Grid>

            <Grid item xs={6}>
              <h3>Buy Orders</h3>
              {marketData.buy ?
              <><p>{marketData.buy.volume} orders</p>
              <p>{marketData.buy.min} min. price</p>
              <p>{marketData.buy.max} max price</p>
              <p>{marketData.buy.avg} avg price</p></> : <p>Issue with buy data</p>}
            </Grid>
          </Grid>
        </div>
      }
    />
  )
}