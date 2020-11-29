import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loading(props) {
  return(
    <div style={{marginTop: '20%', textAlign: 'center'}}>
      <CircularProgress color="primary" />
    </div>
  )  
}
