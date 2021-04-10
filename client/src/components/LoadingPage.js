import React from 'react'
import Loading from './Loading'
import PageTemplate from './PageTemplate'

export default function LoadingPage(props) {
  // todo: more advanced / nicer error page
  return(
    <PageTemplate>
      {(props.loading && !props.error) &&
        <Loading />
      }
      {props.error && 
        <h3 style={{textAlign: 'center'}}>Sorry! We weren't able to load that page</h3>
      }
    </PageTemplate>
  )
}