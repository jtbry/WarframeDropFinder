import React from 'react'
import Container from '@material-ui/core/Container'
import ItemSearchBar from './ItemSearchBar'


export default function PageTemplate(props) {
  const styles = {
    width: '100%',
    textAlign: 'center',
    paddingTop: '1rem'
  }

  return(
    <>
    <div style={styles}>
      <ItemSearchBar isNavbar />
    </div>
    <Container maxWidth='lg'>
      {props.children}
    </Container>
    </>
  )
}
