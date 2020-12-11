import React from 'react'
import Container from '@material-ui/core/Container'

export default function PageTemplate(props) {
  // todo: navbar etc, page template items present on all pages
  // except the home page
  return(
    <Container maxWidth='lg'>
      {props.children}
    </Container>
  )
}
