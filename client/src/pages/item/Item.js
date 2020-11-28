import React from 'react'
import ItemError from './ItemError'
import ItemLoading from './ItemLoading'
import Navbar from '../../components/NavbarPage'
import { default as wfdfApi } from '../../apis/wfdf'
import Container from '@material-ui/core/Container'
import PowersuitsItem from './PowersuitsItem'

class Item extends React.Component {
  // todo: some sort of client sided caching
  // warframe market implements a form of client caching
  // that doesn't fetch from the API on every page reload
  // maybe we can do the same for items specifically, not market data
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
      // Node: Nodes
      // Melee: Arch-Melee, Melee
      // Weapon: Primary, Secondary
      // Misc: Arcanes, Misc, Skins
      // Companions: Pets, Sentinels
      // Generic: Fish, Gear, Glyphs, Quests, Relics, Resources, Sigils
      let element = undefined
      const category = this.state.data.category
      if(category === 'Warframes' || category === 'Archwing') {
        element = (
          <PowersuitsItem item={this.state.data} />
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
