import React, { useState } from 'react'
import { Card, CardContent } from '@material-ui/core' 
import MinimizeIcon from '@material-ui/icons/Minimize';
import AddIcon from '@material-ui/icons/Add';

export default function CollapsingCard(props) {
  const [shown, setShown] = useState(true)
  const toggle = () => {
    setShown(!shown)
  }
  const toggleElement = (shown ? <MinimizeIcon onClick={toggle}/> : <AddIcon onClick={toggle}/>)
  return(
    <Card style={props.cardStyle}>
      <CardContent style={props.contentStyle}>
        <div style={{textAlign: 'left'}}>
          <span style={{float: 'left'}}>
            {props.title}
          </span>
          <span style={{float: 'right'}}>
            <h1 style={{cursor: 'pointer'}}>{toggleElement}</h1>
          </span>
        </div>
        {shown && props.content}
      </CardContent>
    </Card>
  )
}