import Axios from 'axios'
import React from 'react'
import LoadingPage from '../../components/LoadingPage'
import PageTemplate from '../../components/PageTemplate'
import ItemHeader from '../item/ItemHeader'
import ItemMarketData from '../item/ItemMarketData'
import DropTable from '../../components/DropTable'
import ItemSetTable from './ItemSetTable'

class ItemComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, error: false, data: undefined, component: '/' + props.match.params[0]}
  }

  componentDidMount() {
    Axios.post('/api/v1/items/component', {componentUniqueName: this.state.component})  
      .then(response => {
        if(response.status === 200) {
          if(response.data.sets.length === 1) {
            // todo inject a link to the set item in the description
            response.data.component.description = `${response.data.component.name} component for ${response.data.sets[0].name}`
            response.data.component.name = `${response.data.sets[0].name} ${response.data.component.name}`
          }
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
      const component = this.state.data.component
      const sets = this.state.data.sets
      return(
        <PageTemplate>
          <ItemHeader item={component} isComponent />
          {component.marketData && <ItemMarketData marketData={component.marketData}/>}
          {component.drops && <DropTable drops={component.drops} />}
          {sets && <ItemSetTable sets={sets} />}
        </PageTemplate>
      )
    } else {
      return(<LoadingPage loading={this.state.loading} error={this.state.error} />)
    }
  }
}

export default ItemComponent