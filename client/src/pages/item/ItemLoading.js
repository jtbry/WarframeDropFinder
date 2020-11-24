import React from 'react'
import Navbar from '../../components/NavbarPage'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function ItemLoading() {
  return(
    <Navbar>
      <Container maxWidth="lg">
        <div style={{textAlign: 'center', marginTop: '3rem'}}>
          <CircularProgress variant="indeterminate" />
        </div>
      </Container>
    </Navbar>
  )
}
