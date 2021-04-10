import { Card, CardContent } from '@material-ui/core'
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import React from 'react'


function createImageHeader(cat, imgName, itemName) {
  switch(cat) {
    case 'Warframes':
    case 'Archwing':
      return(
        <img
          src={`https://cdn.warframestat.us/img/${imgName}`} 
          alt={itemName}
          width='25%'
          style={{marginTop: '1rem', borderRadius: '2rem', position: 'relative', zIndex: '0'}}
        />
      )
    case 'Glyphs':
    case 'Component':
      return(
        <img
          src={`https://cdn.warframestat.us/img/${imgName}`} 
          alt={itemName}
          width='10%'
          style={{marginTop: '2rem', marginBottom: '2rem', borderRadius: '2rem', position: 'relative', zIndex: '0'}}
        />
      )
    default:
      return(
        <img
          src={`https://cdn.warframestat.us/img/${imgName}`} 
          alt={itemName}
          width='30%'
          style={{marginTop: '1rem', marginBottom: '1.5rem', borderRadius: '2rem', position: 'relative', zIndex: '0'}}
        />
      )
  }
}

function createWikiaUrl(potentialWikiaUrl, name) {
  if(potentialWikiaUrl) return potentialWikiaUrl
  else {
    return `https://warframe.fandom.com/wiki/${name.replaceAll(' ', '_')}`
  }
}

export default function ItemHeader(props) {
  const item = props.item
  if(props.isComponent) item.category = 'Component'
  return (
    <div>
      <div style={{textAlign: 'center'}}>
        {createImageHeader(item.category, item.imageName, item.name)}
      </div>
      <Card style={{display: 'flex', marginTop: '-1rem',  position: 'relative', zIndex: '1', padding: '0px'}}>
        <CardContent style={{paddingTop: '0px'}}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p className="minorText" style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase'}}>
            <a rel='noreferrer' href={createWikiaUrl(item.wikiaUrl, item.name)} target="_blank">Wiki Page</a>
            {item.type && (<><ArrowRightOutlinedIcon/>{item.type}</>)}
            {item.aura && (<><ArrowRightOutlinedIcon/>{item.aura}</>)}
            {item.tradable && (<><ArrowRightOutlinedIcon/>{'tradable'}</>)}
            {item.vaulted && (<><ArrowRightOutlinedIcon/>{'vaulted'}</>)}
            {item.introduced && (<><ArrowRightOutlinedIcon/>{item.introduced}</>)}
            {item.patchlogLength && <><ArrowRightOutlinedIcon/>Patchlogs</>}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}