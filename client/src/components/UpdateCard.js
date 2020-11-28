import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function PatchlogCard(props) {
  const date = new Date(props.data.ended)
  const startDate = new Date(props.data.started)
  const updateTime = Math.ceil((date.getTime() - startDate.getTime()) / 1000 / 60)
  const today = new Date()
  const daysAgo = Math.round((today - date)/(1000*60*60*24));
  const daysAgoStr = daysAgo <= 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  return (
    <Card style={{height: '100%'}} variant="elevation">
      <CardContent>
        <Typography color="textSecondary" align="center" gutterBottom>
          {daysAgoStr}
        </Typography>
        {props.data.type !== 'Market' ? 
        (<Typography align="center" gutterBottom>
          {props.data.added} items added
          <br />
          {props.data.changed} items changed
          <br />
          {props.data.unchanged} items unchanged
        </Typography>)
        : (<Typography align="center" gutterBottom>
        {props.data.items} items
        <br />
        {props.data.components} components
        <br />
        {props.data.unchanged} unchanged
        </Typography>)
        }
        <Typography color="textSecondary" align="center" gutterBottom>
          {props.data.type}
        </Typography>
        <Typography color="textSecondary" align="center" gutterBottom>
          Took {updateTime} minute{updateTime > 1 ? 's' : ''}
        </Typography>
      </CardContent>
    </Card>
  );
}

// todo: show time diff of started and ended (duration of update)