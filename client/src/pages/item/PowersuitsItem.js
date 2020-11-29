import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ItemPricing from '../../components/ItemPricing'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

export default function PowersuitsItem(props) {
  const item = props.item
  return(
    <div>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12} sm={6}>
          <Paper className='itemDetailsHolder' square>
            <p className='itemSectionName'>Abilities</p>
            {item.passiveDescription &&
              <>
              <p className='secondarySectionName'>Passive</p>
              <p>{item.passiveDescription}</p>
              </>
            }
            {item.abilities.map(ability => {
              return(
                <div key={ability.name}>
                  <p className='secondarySectionName'>{ability.name}</p>
                  <p>{ability.description}</p>
                </div>
              )
            })}
          </Paper>
        </Grid>
        <Grid item container spacing={1} xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
            <Paper className='itemDetailsHolder' square>
              <p className='itemSectionName'>Item Stats</p>
              <p>Health: {item.health}</p>
              <p>Shield: {item.shield}</p>
              <p>Armor: {item.armor}</p>
              <p>Power: {item.power}</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className='itemDetailsHolder' square>
              <p className='itemSectionName'>Crafting Info</p>
              {item.buildQuantity && <p>Quantity: {item.buildQuantity}</p>}
              {item.skipBuildTimePrice && <p>Skip Build Price: {item.skipBuildTimePrice}plat</p>}
              {item.buildPrice && <p>Price: {item.buildPrice} Credits</p>}
              {item.buildTime && <p>Time: {item.buildTime / 60 / 60} Hours</p>}
              {item.masteryReq !== undefined && <p>MR: {item.masteryReq}</p>}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className='itemDetailsHolder' square>
              <p className='itemSectionName'>Version  History</p>
              {item.introduced && <p>Introduced in update {item.introduced}</p>}
              {item.releaseDate && <p>Released on {item.releaseDate.replaceAll(' ', '/')}</p>}
              {item.vaulted && <p>Vaulted on {item.vaultDate.replaceAll(' ', '/')}</p>}
              {!item.vaulted && item.estimatedVaultDate && <p>Est. Vault Date is {item.estimatedVaultDate.replaceAll(' ', '/')}</p>}
              {item.patchlogLength && <p>Mentioned in {item.patchlogLength} patchlogs</p>}
              {item.patchlogLength > 0 && <p>
              <Button 
                disableElevation 
                variant='contained' 
                color='primary' 
                endIcon={<ArrowRightAltIcon/>} 
                href={`/patchlogs${item.uniqueName}`}>Patchlog History
              </Button>
              </p>}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className='itemDetailsHolder' square>
              <p className='itemSectionName'>Price Data</p>
              <ItemPricing item={item} detailed />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

// todo: fix grid spacing
// right now the grid elements on the right look weird
// will keep for now but eventually the spacing between
// grid items should look better

// todo: replace percentages in passive descriptions
// for example: "Slide |SPEED|% faster and go |RANGE|% farther." 
// will become "Slide faster *based on speed* and go farther *based on range*."
