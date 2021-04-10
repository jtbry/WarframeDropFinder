import React from 'react'
import { Grid } from '@material-ui/core'
import CollapsingCard from '../../components/CollapsingCard'

function fixFieldName(field) {
  let name = field.split(/(?=[A-Z])/).join(" ")
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function fixFieldValue(name, value) {
  if(typeof value === 'boolean') {
    if(value) return 'true'
    else return 'false'
  }
  // Ignore arrays/objects for now
  if(typeof value === 'object') return undefined
  return value
}

function getItemStats(item) {
  let unwantedFields = ["uniqueName", "wikiaUrl", "wikiaThumbnail", "description",
    "type", "productCategory", "imageName", "conclave",
    "category", "aura", "components", "color", "patchlogLength",
    "marketData", "tradable", "name", "vaulted", 
    "introduced", "abilities", "passiveDescription", "polarities"]
  let stats = []

  for(let field of Object.keys(item)) {
    if(!unwantedFields.includes(field) && item[field]) {
      stats.push({
        name: fixFieldName(field),
        value: fixFieldValue(field, item[field])
      })
    }
  }

  return stats;
}

export default function ItemStats(props) {
  // todo make this more aesthetically pleasing
  const item = props.item
  const stats = getItemStats(item)
  return(
    <CollapsingCard 
      cardStyle={{display: 'flex', padding: '0px', marginTop: '1rem'}}
      contentStyle={{paddingTop: '0px'}}
      title={<h1>Item Stats</h1>}
      content={
        <Grid container spacing={4}>
        {stats.map(stat => {
          if(stat.value) {
            return(
              <Grid item key={stat.name}>
                {stat.name}: {stat.value}
              </Grid>
            )
          } else return null
        })}
        </Grid>
      }
    />
  )
}