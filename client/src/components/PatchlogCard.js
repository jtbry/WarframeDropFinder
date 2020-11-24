import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default function PatchlogCard(props) {
  const date = new Date(props.data.date)
  const today = new Date()
  const daysAgo = Math.round((today - date)/(1000*60*60*24));
  const daysAgoStr = daysAgo <= 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  const updateSplit = props.data.name.split(':')
  const majorName = updateSplit[0]
  updateSplit.splice(0, 1)
  const minorName = updateSplit.join(' ')
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography color="textSecondary" align="center" gutterBottom>
          {daysAgoStr}
        </Typography>
        <Typography align="center">
          {majorName}
          <br />
          {minorName}
        </Typography>
      </CardContent>
      <Typography color="textSecondary" align="center" gutterBottom>
          <Button href={props.data.link} target="_blank">
            See Full Patchlog
          </Button>
        </Typography>
    </Card>
  );
}