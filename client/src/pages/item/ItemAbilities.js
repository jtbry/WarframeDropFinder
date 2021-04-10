import React from 'react'
import { Grid } from '@material-ui/core'
import CollapsingCard from '../../components/CollapsingCard';

export default function ItemAbilities(props) {
  const abilities = props.abilities;
  return(
    <CollapsingCard cardStyle={{display: 'flex', padding: '0px', marginTop: '1rem'}}
      contentStyle={{paddingTop: '0px'}}
      title={<h1>Item Abilities</h1>}
      content={
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
      }
    />
  )
}