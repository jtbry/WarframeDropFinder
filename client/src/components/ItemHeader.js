import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';


export default function ItemHeader(props) {
  const item = props.item
  // todo: different sizing for glyphs
  return(
    <div>
      <div style={{textAlign: 'center'}}>
        <img 
          src={`https://cdn.warframestat.us/img/${item.imageName}`} 
          alt={item.name}
          width='25%'
          style={{marginTop: '.5rem', borderRadius: '2rem', position: 'relative', zIndex: '0'}}
        />
      </div>
      <Card style={{display: 'flex', marginTop: '-1rem',  position: 'relative', zIndex: '1'}}>
        <CardContent style={{lineHeight: '1rem'}}>
          <h1 className="itemSectionName">
            {item.name} 
            {item.wikiaUrl && 
            <Button 
              disableElevation 
              variant='contained' 
              color='primary' 
              endIcon={<ArrowRightAltIcon/>} 
              style={{marginLeft: '3rem'}} 
              href={`${item.wikiaUrl}`} target="_blank">Wiki Page</Button>}
          </h1>
          <p>{item.description}</p>
          <p className="smallText" style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '.7rem'}}>
            {item.type}
            {item.aura && (<><ArrowRightOutlinedIcon/>{item.aura}</>)}
            {item.tradable && (<><ArrowRightOutlinedIcon/>{'tradable'}</>)}
            {item.vaulted && (<><ArrowRightOutlinedIcon/>{'vaulted'}</>)}
            {item.introduced && (<><ArrowRightOutlinedIcon/>{item.introduced}</>)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}