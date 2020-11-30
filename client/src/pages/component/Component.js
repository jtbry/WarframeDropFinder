import React from 'react'
import ItemSet from './ItemSet'
import wfdf from '../../apis/wfdf'
import Loading from '../../components/Loading'
import Navbar from '../../components/NavbarPage'
import Container from '@material-ui/core/Container'
import ItemHeader from '../../components/ItemHeader'
import ItemPricing from '../../components/ItemPricing'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.componentUniqueName = '/' + props.match.params[0]
    this.state = {loading: true, error: false, data: undefined}
  }

  componentDidMount() {
    wfdf.getComponent(this.componentUniqueName)
      .then(response => {
        this.setState({loading: false, error: false, data: response.data})
      })
      .catch(err => {
        console.error(err)
        this.setState({loading: false, data: undefined, error: true})
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
              <h5 style={{fontSize: '1.5rem'}}>We weren't able to find this component<br />Are you sure it exists?</h5>
            </div>
          </Container>
        </Navbar>  
      )
    }
    if(this.state.data) {
      const component = this.state.data.component
      return (
        <Navbar>
          <Container maxWidth="lg">
            <ItemHeader item={component}>
              <p style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '1rem'}}>
                {component.dropLength ? 
                  (<a href={`/drops${component.uniqueName}?isComponent=true`}>Drops from {component.dropLength} locations</a>)
                  : (<>Drops Unknown</>)
                }
                <FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />
                <ItemPricing item={component} seperator={<FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />} />
              </p>
            </ItemHeader>
            {this.state.data.sets && 
              (<h2 className='itemSectionName' style={{textAlign: 'center', fontSize: '1.5rem'}}>Used for {this.state.data.sets.length} item{this.state.data.sets.length > 1 ? 's' : ''}</h2>)
            }
            {this.state.data.sets && this.state.data.sets.map(set => {
                return(
                  <ItemSet key={set.uniqueName} set={set} />
                )
            })}
          </Container>
        </Navbar>  
      )
    }
  }
}

export default Component
