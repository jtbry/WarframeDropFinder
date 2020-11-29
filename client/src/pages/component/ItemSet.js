import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import CardContent from '@material-ui/core/CardContent'

export default function ItemSet(props) {
  const set = props.set
  return(
    <Card className='pageContentCard'>
      <img 
        src={`https://cdn.warframestat.us/img/${set.imageName}`} 
        alt={set.name}
        style={{margin: '0 0 auto', display: 'block'}}
        height='100%'
        width='13%'
      />
      <CardContent>
          <span className='itemSectionName'>{set.name}
          <Button 
            disableElevation 
            variant='contained' 
            color='primary' 
            endIcon={<ArrowRightAltIcon/>} 
            style={{marginLeft: '3rem'}} 
            href={`/item${set.uniqueName}`}>More Info</Button>
          </span>
          <p>{set.description}</p>
      </CardContent>
    </Card>
  )
}
