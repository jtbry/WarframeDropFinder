import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import CardContent from '@material-ui/core/CardContent'
import ItemPricing from './ItemPricing'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const sectionNameStyles = {
  fontSize: '1.3rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  fontFamily: '\'Montserrat\', sans-serif'
}

// todo: link to component page to show full drop location list
// todo: if marketData field exists but is undefined then there was
// an error fetching marketData likely meaning that the item does not
// exist on WFM
class CraftingComponent extends React.Component {
  constructor(props) {
    super(props)
    this.component = props.component
    this.set = props.set
    this.state = { componentPrice: undefined }
  }

  render() {
    const component = this.component
    return(
      <Card style={{display: 'flex', marginTop: '1rem',}}>
        <img 
          src={`https://cdn.warframestat.us/img/${component.imageName}`} 
          alt={component.name}
          style={{margin: '0 0 auto', display: 'block'}}
          height='100%'
          width='13%'
        />
        <CardContent>
            <span style={sectionNameStyles}>{component.name} <Button style={{marginLeft: '3rem'}} href={`/component${component.uniqueName}`}>More Info <ArrowRightAltIcon/> </Button></span>
            <p>{component.description}</p>
            <p style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '1rem'}}>
              {component.drops ? 
                (<a href={`/drops${component.uniqueName}`}>Drops from {component.drops.length} locations</a>)
                : (<>Drops Unknown</>)
              }
              <FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />
              <ItemPricing item={component} seperator={<FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />} />
            </p>
        </CardContent>
      </Card>
    )
  }
}

export default CraftingComponent
// todo: integrate market data with card
