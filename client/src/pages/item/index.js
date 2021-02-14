import Axios from 'axios';
import React from 'react'
import { Redirect } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate'
import Loading from '../../components/Loading'
import ItemHeader from './ItemHeader'
import ItemAbilities from './ItemAbilities'
import ItemStats from './ItemStats'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, error: false, data: undefined, item: '/' + props.match.params[0]}
  }

  componentDidMount() {
    Axios.post(`/api/v1/items`, {itemUniqueName: this.state.item})
      .then(response => {
        if(response.status === 200) {
          this.setState({loading: false, data: response.data})
        } else this.setState({error: true})
      })
      .catch(error => {
        console.error(error)
        this.setState({error: true})
      })
  }

  render() {
    if(this.state.error) {
      return(
        <PageTemplate>
          <h3>Error Finding Item</h3>
        </PageTemplate>
      )
    } else if(this.state.loading) {
      return(
        <PageTemplate>
          <div style={{marginTop: '5rem'}}>
            <Loading />
          </div>
        </PageTemplate>
      )
    } else if(this.state.data) {
      // todo: some form of dynamic rendering
      // not all items have the same fields but certain categories share fields
      // with other categories. need to either dynamically read these fields in one page
      // or make a new page for all categories.

      // Page layout:
      // Item Header - Basic item name, description, picture etc. All items have this
      // Item Stats - Any stat related data, health, damage, etc. Should be dynamic
      // Item Drops or Components - Display drop locations or components, items will have one or the other.
      return(
        <PageTemplate>
          <ItemHeader item={this.state.data} />
          {this.state.data.abilities && <ItemAbilities 
            abilities={this.state.data.abilities} 
            passive={this.state.data.passiveDescription} />}
          <ItemStats item={this.state.data} />
        </PageTemplate>
      )
    } else {
      return(
        <Redirect to='/' />
      )
    }
  }
}

export default Item