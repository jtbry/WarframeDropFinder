import React from 'react'
import Card from '@material-ui/core/Card'
import Grid  from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

const resultsStyle = {
  borderTop: '1px solid #c4c4c4', 
  borderRadius: '0px 0px 3px 3px',
  width: '70%',
  position: 'relative',
  zIndex: '99'
}
const itemAvatarStyle = {
  width: '3.5rem',
  height: '3.5rem'
}

export default function ItemSearchResults(props) {
  if(props.data.length <= 0 || props.data.error) {
    return(
      <Card style={resultsStyle}>
        <p style={{fontWeight: '500'}}>No Items Found</p>
      </Card>
    )
  } else {
    // todo: Go to top result on pressing enter key
    // Allow results traversal with arrow keys
    return(
      <Card style={resultsStyle}>
        <Grid container spacing={1} direction="column">
          {props.data.map(item => {
            return(
              <Grid style={{padding: '1rem'}} item key={item.uniqueName}>
                <div style={{display: 'flex'}}>
                  <Button style={{textAlign: 'left', justifyContent: 'left', textTransform: 'none'}} fullWidth href={`/item${item.uniqueName}`}>
                    <Avatar style={itemAvatarStyle} variant="rounded" src={`https://cdn.warframestat.us/img/${item.imageName}`} alt={item.name} />
                    <div style={{display: 'inline-block'}} >
                      <span style={{display: 'block', fontWeight: '500', fontSize: '1.1rem', marginLeft: '1rem'}}>{item.name}</span>
                      <span style={{display: 'block', marginLeft: '1rem'}}>
                        <Chip size="small" color="primary" label={item.type} />
                        {item.tradable && <Chip style={{marginLeft: '.5rem'}} size="small" color="primary" label="Tradable" /> }
                        {item.vaulted && <Chip style={{marginLeft: '.5rem'}} size="small" color="primary" label="Vaulted" /> }
                      </span>
                    </div>
                  </Button>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </Card>
    )
  }
}