import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import ItemSearchBar from '../../components/ItemSearchBar'
import PatchlogDisplay from './PatchlogDisplay'
import UpdateDisplay from './UpdateDisplay'

class Home extends React.Component {
  render() {
    return(
      <div style={{paddingTop: '2rem'}}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 style={{textAlign: 'center', fontWeight: '900', fontSize: '2rem'}}>Looking for something?</h2>
              <ItemSearchBar />
            </Grid>
          </Grid>

          <div style={{marginTop: '5rem'}} >
            <h4>Recent Patchlogs</h4>
            <PatchlogDisplay />
          </div>

          <div style={{marginTop: '5rem'}} >
            <h4>Recent Updates</h4>
            <UpdateDisplay />
          </div>
        </Container>
      </div>
    )
  }
}

export default Home
