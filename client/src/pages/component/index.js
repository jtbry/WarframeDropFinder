import Axios from 'axios'
import React from 'react'
import LoadingPage from '../../components/LoadingPage'
import PageTemplate from '../../components/PageTemplate'

class ItemComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, error: false, data: undefined, component: '/' + props.match.params[0]}
  }

  componentDidMount() {
    Axios.post('/api/v1/items/component', {componentUniqueName: this.state.component})  
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
      // page layout
      // component image, description etc (item header)
      // craft table (what can the component craft into)
      // drop table (where does the component drop)
      return(
        <PageTemplate>
          <p>{JSON.stringify(this.state.data)}</p>
        </PageTemplate>
      )
    } else {
      return(<LoadingPage loading={this.state.loading} error={this.state.error} />)
    }
  }
}

export default ItemComponent