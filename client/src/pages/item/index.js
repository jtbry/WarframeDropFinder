import Axios from 'axios';
import React from 'react'
import { Redirect } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate'
import Loading from '../../components/Loading'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.itemUniqueName = '/' + props.match.params[0];
    this.state = {loading: true, error: false, data: undefined}
  }

  componentDidMount() {
    Axios.post(`/api/v1/items`, {itemUniqueName: this.itemUniqueName})
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
      return(
        <PageTemplate>
          <h1>{this.state.data.name}</h1>
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