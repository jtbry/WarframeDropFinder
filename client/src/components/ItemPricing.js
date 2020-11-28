import React from 'react'

function platinumPrice(item) {
  if(item.tradable) {
    if(item.hasOwnProperty('marketData') && item.marketData != null) {
      return (
        <a href={`https://warframe.market/items/${item.marketData.name}`} rel="noreferrer" target="_blank">Worth {item.marketData.avg} Platinum</a>
      )
    } else {
      return (
        <>Unknown Platinum Value</>
      )
    }
  } else {
    return (
      <>Not Tradable</>
    )
  }
}

export default function ItemPricing(props) {
  if(!props.isDetailed) {
    return (
      <>
        {platinumPrice(props.item)}
        {props.item.ducats &&
          <>
            {props.seperator}
            Worth {props.item.ducats} Ducats
          </>
        }
      </>
    )
  } else {
    // todo: detailed pricing
    // last update, avg, min, max, volume
    return (
      <p>Detailed Pricing...</p>
    )
  }
}