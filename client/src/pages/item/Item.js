import React from 'react'
import ItemError from './ItemError'
import PowersuitsItem from './PowersuitsItem'
import Loading from '../../components/Loading'
import Navbar from '../../components/NavbarPage'
import Container from '@material-ui/core/Container'
import ItemHeader from '../../components/ItemHeader'
import { default as wfdfApi } from '../../apis/wfdf'
import CraftingComponent from './CraftingComponent'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.itemUniqueName = '/' + props.match.params[0]
    this.state = {loading: true, error: false, data: undefined}
  }

  componentDidMount() {
    wfdfApi.getItem(this.itemUniqueName)
      .then(item => {
        if(item) {
          this.setState({loading: false, data: item.data, error: false})
        } else {
          this.setState({loading: false, data: undefined, error: false})
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({loading: false, data: undefined, error: true})
      })
  }

  render() {
    if(this.state.loading) {
      return(
        <Navbar>
          <Container maxWidth="lg">
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
              <Loading />
            </div>
          </Container>
        </Navbar>
      )
    } else if(this.state.error || !this.state.data) {
      return(<ItemError />)
    } else if(this.state.data) {
      // todo: Item Category Components
      // Mods: Mods
      // Node: Nodes
      // Melee: Arch-Melee, Melee
      // Weapon: Primary, Secondary
      // Misc: Arcanes, Misc, Skins
      // Companions: Pets, Sentinels
      // Generic: Fish, Gear, Glyphs, Quests, Relics, Resources, Sigils
      let element = undefined
      const category = this.state.data.category
      switch (category) {
        case 'Warframes':
        case 'Archwing':
          element = <PowersuitsItem item={this.state.data} />
          break
        default:
          element = <></>
          break
      }
      const shouldRenderComponents = (this.state.data.components && this.state.data.components.length > 0)
      return(
        <Navbar>
          <Container maxWidth="lg">
            <ItemHeader item={this.state.data} showSmallText />
            {element}
            {shouldRenderComponents &&
              (<h2 className='itemSectionName' style={{textAlign: 'center', fontSize: '1.5rem'}}>Components</h2>)
            }
            {shouldRenderComponents && this.state.data.components.map(component => {
              return(
                <CraftingComponent
                  key={component.uniqueName} 
                  component={component} 
                />
              )
            })}
          </Container>
        </Navbar>
      )
    } else {
      return(<ItemError />)      
    }
  }
}

export default Item
