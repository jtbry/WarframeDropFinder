import React from 'react'
import ItemError from './ItemError'
import ItemLoading from './ItemLoading'
import Navbar from '../../components/NavbarPage'
import { default as wfdfApi } from '../../apis/wfdf'
import Container from '@material-ui/core/Container'
import WarframeContent from './WarframeContent'

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
        <ItemLoading />
      )
    } else if(this.state.error || !this.state.data) {
      return(<ItemError />)
    } else if(this.state.data) {
      // todo: Item Category Components
      // Mods: Mods
      // Arcanes: Arcanes
      // DropLocation: Node, Relics
      // Weapons: Primary, Secondary, Melee
      // Companions: Sentinels, Pets, Archwings, ArchMelee
      // Generic: Misc, Glyphs, Skins, Gear, Fish, Quests, Resources, Sigil
      let element = undefined
      if(this.state.data.category === 'Warframes') {
        element = (
          <WarframeContent item={this.state.data} />
        )
      } else {
        element = (
          <h1>{this.state.data.name}</h1>
        )
      }
      return(
        <Navbar>
          <Container maxWidth="lg">
            {element}
          </Container>
        </Navbar>
      )
    } else {
      return(<ItemError />)      
    }
  }
}

export default Item
