import React from 'react'
import wfdf from '../../apis/wfdf'
import Button from '@material-ui/core/Button'
import Loading from '../../components/Loading'
import Navbar from '../../components/NavbarPage'
import DropLocationTable from './DropLocationTable'
import Container from '@material-ui/core/Container'
import ItemHeader from '../../components/ItemHeader'
import ItemPricing from '../../components/ItemPricing'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.itemUniqueName = '/' + props.match.params[0]
    this.state = {loading: true, error: false, data: undefined}
  }

  componentDidMount() {
    const isComponent = (this.props.location.search.includes('isComponent'))
    wfdf.getItemDrops(this.itemUniqueName, isComponent)
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
      const item = this.state.data.item
      return (
        <Navbar>
          <Container maxWidth="lg">
            <ItemHeader item={item}>
              <div style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', textTransform: 'uppercase', fontSize: '1rem'}}>
                <ItemPricing item={item} seperator={<FiberManualRecordIcon style={{fontSize: '.5rem', marginLeft: '1rem', marginRight: '1rem'}} />} />
                <Button style={{marginLeft: '1rem'}} disableElevation variant='contained' color='primary' endIcon={<ArrowRightAltIcon/>} 
                href={`${this.state.data.isComponent ? '/component' : '/item'}${item.uniqueName}`}>
                  More Info
                </Button>
              </div>
            </ItemHeader>
            {item.drops && 
              (<h2 className='itemSectionName' style={{textAlign: 'center', fontSize: '1.5rem'}}>Drops from {item.drops.length} location{item.drops.length > 1 ? 's' : ''}</h2>)
            }
            {item.drops && 
              <DropLocationTable drops={item.drops} />
            }
          </Container>
        </Navbar>  
      )
    }
  }
}

export default Component
