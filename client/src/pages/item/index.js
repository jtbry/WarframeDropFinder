import Axios from 'axios';
import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import ItemHeader from './ItemHeader'
import ItemAbilities from './ItemAbilities'
import ItemStats from './ItemStats'
import ComponentTable from '../../components/ComponentTable'
import DropTable from '../../components/DropTable'
import LoadingPage from '../../components/LoadingPage'
import ItemMarketData from './ItemMarketData'

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
        } else this.setState({loading: false, error: true})
      })
      .catch(error => {
        console.error(error)
        this.setState({loading: false, error: true})
      })
  }

  render() {
    if(this.state.data) {
      return(
        <PageTemplate>
          <ItemHeader item={this.state.data} />
          {this.state.data.marketData && !this.state.data.marketData.unavailable && <ItemMarketData marketData={this.state.data.marketData}/>}
          {this.state.data.abilities && <ItemAbilities 
            abilities={this.state.data.abilities} 
            passive={this.state.data.passiveDescription} />}
          <ItemStats item={this.state.data} />
          {this.state.data.components && <ComponentTable components={this.state.data.components} />}
          {this.state.data.drops && <DropTable drops={this.state.data.drops} />}
        </PageTemplate>
      )
    } else {
      return(<LoadingPage loading={this.state.loading} error={this.state.error} />)
    }
  }
}

export default Item