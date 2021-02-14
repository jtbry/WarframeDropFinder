import React from 'react'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'

export default function SearchResults(props) {
  const history = useHistory()
  const results = props.results;
  const resultContainerStyles = {
    background: 'white',
    width: '40%',
    left: '30%',
    position: 'absolute',
    border: 'none',
    borderTop: '1px solid var(--background-secondary)',
    borderRadius: '0px 0px 3px 3px',
    zIndex: 99
  }
  if(!results || results.error || results.length === 0) {
    return(
      <Paper variant='outlined' style={resultContainerStyles} className='decorativeBottomBorder'>
        <p>No Items Found</p>
      </Paper>
    )
  } else {
    // todo: fix item navigation.
    // for now clicking on an item result will refresh the page
    // but ideally we can achieve this with updating state somewhere
    // without refreshing the page if you navigate to a new item from another item
    // it will not update the data displayed on the page.
    // the browser fwd and back buttons are not working for the same reason
    return(
      <Paper variant='outlined' style={resultContainerStyles} className='decorativeBottomBorder'>
        <Grid container spacing={1} direction="column">
          {results.map((item, idx) => {
            return(
              <Grid style={{padding: '1rem'}} item key={idx} className='clickableBackground' onClick={() => {history.push(`/items${item.uniqueName}`); window.location.reload()}}>
                <div style={{display: 'flex', textAlign: 'left', alignContent: 'left'}}>
                <div style={{display: 'flex'}}>
                    <Avatar style={{width: '3.5rem',height: '3.5rem'}} variant="rounded" src={`https://cdn.warframestat.us/img/${item.imageName}`} alt={item.name} />
                    <div style={{display: 'inline-block'}} >
                      <span style={{display: 'block', fontWeight: '500', fontSize: '1.1rem', marginLeft: '1rem'}}>{item.name}</span>
                      <span style={{display: 'block', marginLeft: '1rem'}}>
                        <Chip size="small" color="primary" label={item.category} />
                        {item.tradable && <Chip style={{marginLeft: '.5rem'}} size="small" color="primary" label="Tradable" /> }
                        {item.vaulted && <Chip style={{marginLeft: '.5rem'}} size="small" color="primary" label="Vaulted" /> }
                      </span>
                    </div>
                </div>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    )
  }
}
