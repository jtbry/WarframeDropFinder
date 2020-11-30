import React from 'react'

// todo: add support for marketCost
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
  if(!props.item.marketData) {
    if(!props.item.marketCost && !props.item.ducats) {
      return (
        <p>No Price Details Available</p>
      )
    } else {
      return (
        <>
        { props.item.marketCost && <p>Market Price: {props.item.marketPrice} platinum</p>}
        { props.item.ducats && <p>Sells for {props.item.ducats} ducats</p>}
        </>
      )
    }
  }
  if(!props.detailed) {
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
    const now = new Date()
    const lastUpdate = new Date(props.item.marketData.lastUpdate)
    let timeSinceLastUpdate = Math.round((now - lastUpdate) / 1000 / 60)
    let lastUpdatedStr = ''
    if(timeSinceLastUpdate >= 60) {
      timeSinceLastUpdate = Math.round(timeSinceLastUpdate / 60)
      lastUpdatedStr = `${timeSinceLastUpdate} hour${timeSinceLastUpdate > 1 ? 's' : ''} ago`

    } else {
      lastUpdatedStr = `${timeSinceLastUpdate} minute${timeSinceLastUpdate > 1 ? 's' : ''} ago`
    }
    return (
      <div>
        <p>Last Update: {lastUpdatedStr}</p>
        <p>Avg Price: {props.item.marketData.avg} platinum</p>
        <p>Min Price: {props.item.marketData.min} platinum</p>
        <p>Max Price: {props.item.marketData.max} platinum</p>
        <p>Listings: {props.item.marketData.volume} (48hrs)</p>
        { props.item.marketCost && <p>Market Price: {props.item.marketPrice} platinum</p>}
        { props.item.ducats && <p>Sells for {props.item.ducats} ducats</p>}
        <a href={`https://warframe.market/items/${props.item.marketData.name}`} rel="noreferrer" target="_blank">View on WarframeMarket</a>
        <p></p>
      </div>
    )
  }
}