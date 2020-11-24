import React from 'react'
import ItemError from './ItemError'
import ItemLoading from './ItemLoading'
import Navbar from '../../components/NavbarPage'
import { default as wfdfApi } from '../../apis/wfdf'
import Container from '@material-ui/core/Container'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.itemUniqueName = '/' + props.match.params[0]
    this.state = {loading: false, error: false, data: undefined}
  }

  componentDidMount() {
    wfdfApi.getItem(this.itemUniqueName)
      .then(item => {
        if(item) {
          this.setState({loading: false, data: item, error: false})
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
      // todo: determine type of item and return appropriate component
      // different components for different categories of items
      // "Arcanes",
      // "Arch-Melee",
      // "Archwing",
      // "Fish",
      // "Gear",
      // "Glyphs",
      // "Melee",
      // "Misc",
      // "Mods",
      // "Node",
      // "Pets",
      // "Primary",
      // "Quests",
      // "Relics",
      // "Resources",
      // "Secondary",
      // "Sentinels",
      // "Sigils",
      // "Skins",
      // "Warframes"
      // Figure out which categories are able to share a component
      // i.e: Melee, Primary, Secondary can all share "Weapons" component
      return(
        <Navbar>
          <Container maxWidth="lg">
            {JSON.stringify(this.state.data)}
          </Container>
        </Navbar>
      )
    } else {
      return(<ItemError />)      
    }
  }
}

export default Item
