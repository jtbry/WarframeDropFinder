import React from 'react'
import Navbar from '../../components/NavbarPage'
import Container from '@material-ui/core/Container'

export default function ItemError() {
  return(
    <Navbar>
      <Container maxWidth="lg">
        <div style={{textAlign: 'center', marginTop: '3rem'}}>
          <h3 style={{fontSize: '3rem'}}>Oh no!</h3>
          <h5 style={{fontSize: '1.5rem'}}>We weren't able to find this item<br />Are you sure it exists?</h5>
        </div>
      </Container>
    </Navbar>
  )
}
