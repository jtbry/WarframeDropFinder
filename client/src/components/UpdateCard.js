import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function PatchlogCard(props) {
  const date = new Date(props.data.ended)
  const today = new Date()
  const daysAgo = Math.round((today - date)/(1000*60*60*24));
  const daysAgoStr = daysAgo <= 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography color="textSecondary" align="center" gutterBottom>
          {daysAgoStr}
        </Typography>
        <Typography align="center" gutterBottom>
          {props.data.added} items added
          <br />
          {props.data.changed} items changed
          <br />
          {props.data.unchanged} items unchanged
        </Typography>
        <Typography color="textSecondary" align="center" gutterBottom>
          {props.data.type}
        </Typography>
      </CardContent>
    </Card>
  );
}