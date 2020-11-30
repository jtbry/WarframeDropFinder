import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import CardContent from '@material-ui/core/CardContent'
import ItemPricing from '../../components/ItemPricing'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class CraftingComponent extends React.Component {
  constructor(props) {
    super(props)
    this.component = props.component
    this.set = props.set
  }

  render() {
    const component = this.component
    return(
      <Card className='pageContentCard'>
        <img 
          src={`https://cdn.warframestat.us/img/${component.imageName}`} 
          alt={component.name}
          style={{margin: '0 0 auto', display: 'block'}}
          height='100%'
          width='13%'
        />
        <CardContent>
            <span className='itemSectionName'>{component.name}
            <Button 
              disableElevation 
              variant='contained' 
              color='primary' 
              endIcon={<ArrowRightAltIcon/>} 
              style={{marginLeft: '3rem'}} 
              href={`/component${component.uniqueName}`}>More Info</Button>
            </span>
            <p>{component.description}</p>
            <div style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '1rem'}}>
              {component.drops ? 
                (<a href={`/drops${component.uniqueName}?isComponent=true`}>Drops from {component.drops.length} locations</a>)
                : (<>Drops Unknown</>)
              }
              <FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />
              <ItemPricing item={component} seperator={<FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />} />
            </div>
        </CardContent>
      </Card>
    )
  }
}

export default CraftingComponent
