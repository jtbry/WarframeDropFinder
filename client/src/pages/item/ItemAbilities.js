import React from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'

export default function ItemAbilities(props) {
  const abilities = props.abilities;
  return(
    <Card style={{display: 'flex', padding: '0px', marginTop: '1rem'}}>
      <CardContent style={{paddingTop: '0px'}}>
        <h1>Item Abilities</h1>
        <Grid container spacing={2}>
        {props.passive && <Grid item key={'passive'}>
          <h4>Passive</h4>
          <p>{props.passive}</p>
        </Grid>}
        {abilities.map((ability, idx) => {
          return(
            <Grid item key={idx}>
              <h4>{ability.name}</h4>
              <p>{ability.description}</p>
            </Grid>
          )
        })}
        </Grid>
      </CardContent>
    </Card>
  )
}