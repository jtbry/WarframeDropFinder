import React from 'react'
import wfdf from '../../apis/wfdf'
import Loading from '../../components/Loading'
import Navbar from '../../components/NavbarPage'
import ItemDropsTable from './ItemDropsTable'
import Container from '@material-ui/core/Container'

class DropLocationData extends React.Component {
  constructor(props) {
    super(props)
    this.locationName = props.match.params[0]
    this.state = {loading: true, error: false, data: undefined}
  }

  componentDidMount() {
    wfdf.getDropLocation(this.locationName)
      .then(response => {
        this.setState({loading: false, error: false, data: response.data})
      })
      .catch(error => {
        console.log(error)
        this.setState({loading: false, error: true, data: undefined})
      })
  }

  render() {
    if(this.state.loading) {
      return (
        <Navbar>
          <Container maxWidth="lg">
              <Loading />
          </Container>
        </Navbar>
      )
    }
    if(this.state.error || !this.state.data) {
      return (
        <Navbar>
          <Container maxWidth="lg">
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
              <h3 style={{fontSize: '3rem'}}>Oh no!</h3>
              <h5 style={{fontSize: '1.5rem'}}>We weren't able to find this location<br />Are you sure it exists?</h5>
            </div>
          </Container>
        </Navbar>  
      )
    }
    if(this.state.data) {
      return (
        <Navbar>
          <Container maxWidth="lg">
            <div style={{textAlign: 'center'}}>
              <h1 style={{fontSize: '2rem'}} className="itemSectionName">{this.locationName}</h1>
              <h4 className="secondarySectionName">Drops {this.state.data.length} Item{this.state.data.length > 1 ? 's' : ''}</h4>
            </div>
            <ItemDropsTable drops={this.state.data} />
          </Container>
        </Navbar>  
      )
    }
  }
}

export default DropLocationData
