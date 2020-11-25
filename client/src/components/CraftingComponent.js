import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const sectionNameStyles = {
  fontSize: '1.3rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  fontFamily: '\'Montserrat\', sans-serif'
}

// todo: get item plat price from warframe market if tradable
// todo: link for plat price
// todo: link to component page to show full drop location list
export default function CraftingComponent(props) {
  const component = props.component
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
          <span style={sectionNameStyles}>{component.name}</span>
          <p>{component.description}</p>
          <p style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '1rem'}}>
            {component.tradable ? 
              (<>Worth 10 Platinum</>)
              : (<>Not Tradable</>)
            }
            <FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />
            {component.ducats ? 
              (<>Worth {component.ducats} Ducats</>)
              : (<>Not Worth Ducats</>)
            }
            <FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />
            {component.drops ? 
              (<>Drops from {component.drops.length} locations</>)
              : (<>Drops Unknown</>)
            }
          </p>
      </CardContent>
    </Card>
  )
}
