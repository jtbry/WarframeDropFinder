import './home.css'
import React from 'react'
import WfdfUpdates from './WfdfUpdates'
import WarframePatchlogs from './WarframePatchlogs'
import Container from '@material-ui/core/Container'
import ItemSearchBar from '../../components/ItemSearchBar'
import { ReactComponent as LogoNoBg } from '../../assets/logo_no_bg.svg'

export default function Home(props) {
  return(
    <div>
      <div className='homePageHeader'>
        <LogoNoBg style={{margin: '1.5rem'}} width='23%' />
        <div style={{marginTop: '-3%'}}>
          <h1 className='majorPageHeader'>Looking for something?</h1>
          <ItemSearchBar />
        </div>
      </div>

      <div className='pageSection'>
        <Container maxWidth="lg">
          <h2>Recent Warframe Patchlogs</h2>
          <WarframePatchlogs />

          <br /> <br />

          <h2>Recent DropFinder Updates</h2>
          <WfdfUpdates />
        </Container>
      </div>
    </div>
  )
}
