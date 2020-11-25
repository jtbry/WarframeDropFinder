import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CraftingComponent from '../../components/CraftingComponent'
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';

const sectionNameStyles ={
  fontSize: '1.3rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  fontFamily: '\'Montserrat\', sans-serif'
}
const componentSectionNameStyles ={
  fontSize: '1.5rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  fontFamily: '\'Montserrat\', sans-serif',
  textAlign: 'center'
}

export default function WarframeContent(props) {
  const item = props.item
  return(
    <div>
      {/* Image Header */}
      <div style={{textAlign: 'center'}}>
        <img 
          src={`https://cdn.warframestat.us/img/${item.imageName}`} 
          alt={item.name}
          width='25%'
          style={{marginTop: '.5rem', borderRadius: '2rem', position: 'relative', zIndex: '0'}}
        />
      </div>
      {/* Warframe Data */}
      <Card style={{display: 'flex', marginTop: '-1rem',  position: 'relative', zIndex: '1'}}>
        <CardContent style={{lineHeight: '1rem'}}>
          <h1 style={sectionNameStyles}>{item.name} <Button style={{marginLeft: '3rem'}} href={`${item.wikiaUrl}`} target="_blank">Wiki Page <ArrowRightAltIcon/> </Button></h1>
          <p>{item.description}</p>
          <p className="smallText" style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '.7rem'}}>
            {item.type} <ArrowRightOutlinedIcon /> 
            {item.aura && (<>{item.aura}<ArrowRightOutlinedIcon/></>)}
            {item.tradable && (<>{'tradable'}<ArrowRightOutlinedIcon/></>)}
            {item.vaulted && (<>{'vaulted'}<ArrowRightOutlinedIcon/></>)}
            {item.introduced && (<>{item.introduced}</>)}
          </p>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <span style={sectionNameStyles}>Abilities</span>
                <div>
                  <h1 style={{fontSize: '1rem'}}>Passive</h1>
                  <p>{item.passiveDescription}</p>
                </div>
                {item.abilities.map(ability => {
                  return(
                    <div key={ability.name}>
                      <h1 style={{fontSize: '1rem'}}>{ability.name}</h1>
                      <p>{ability.description}</p>
                    </div>
                  )
                })}      
            </Grid>
            <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6}>
                    <span style={sectionNameStyles}>Stats</span>
                    <p>Health: {item.health}</p>
                    <p>Shield: {item.shield}</p>
                    <p>Armor: {item.armor}</p>
                    <p>Power: {item.power}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={sectionNameStyles}>Crafting</span>
                    <p>Quantity: {item.buildQuantity}</p>
                    <p>Price: {item.buildPrice} Credits</p>
                    <p>Time: {item.buildTime / 60 / 60} Hours</p>
                    <p>MR: {item.masteryReq}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <span style={sectionNameStyles}>
                      Version History <Button style={{marginLeft: '3rem'}} href={`/patchlogs${item.uniqueName}`}>Patchlog History <ArrowRightAltIcon/> </Button>
                    </span>
                    {item.introduced && <p>Introduced in update {item.introduced}</p>}
                    {item.releaseDate && <p>Released on {item.releaseDate}</p>}
                    {item.vaulted && <p>Vaulted on {item.vaultDate}</p>}
                    {!item.vaulted && item.estimatedVaultDate && <p>Est. Vault Date is {item.estimatedVaultDate}</p>}
                    {item.patchlogLength && <p>Mentioned in {item.patchlogLength} patchlogs</p>}
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Render Components */}
      <h2 style={componentSectionNameStyles}>Components</h2>
      {item.components.map(component => {
        return(
          <CraftingComponent key={component.uniqueName} component={component} />
        )
      })}
    </div>
  )
}
// todo: components cards
// underneath the main set display all components
// with component details and brief drop location list (sort by highest chance)
// then have link to a /components/(COMPONENT_NAME) page where more details are shown

// todo: possibly replace percentages in passive descriptions
// for example: "Slide |SPEED|% faster and go |RANGE|% farther." 
// will become "Slide faster *based on speed* and go farther *based on range*."

// todo: display polarities somewhere
// possibly make a PolaryityComponent that we pass the name of the polarity to
// and it will return the apropriate icon
