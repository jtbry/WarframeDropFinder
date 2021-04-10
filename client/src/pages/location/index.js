import Axios from 'axios'
import React from 'react'
import LoadingPage from '../../components/LoadingPage'
import PageTemplate from '../../components/PageTemplate'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

class ItemComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, error: false, data: undefined, location: props.match.params[0]}
  }

  componentDidMount() {
    // todo: fetch location data
    Axios.post('/api/v1/drops/location', {locationName: this.state.location})
        .then(response => {
            if(response.status === 200) {
                this.setState({loading: false, data: response.data})
            } else {
                this.setState({loading: false, error: true})
            }
        })
        .catch(error => {
            console.error(error)
            this.setState({loading: false, error: true})
        })
  }

  render() {
    if(this.state.data) {
        // There are duplicates so we combine their drop chances.
        const items = []
        for(let item of this.state.data) {
            let data = item.drops ? item : item.components
            let idx = items.findIndex(i => i.drops.type === data.drops.type)
            if(idx === -1) {
                if(item.components) data.isComponent = true
                items.push(data)
            }
        }
        return(
            <PageTemplate>
            <div style={{textAlign: "center"}}>
                <h1>{this.state.location}</h1>
                <h3>Drops the following items</h3>
            </div>
            <TableContainer component={Paper} style={{marginTop: '1rem'}}>
            <Table aria-label="Drop Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Drop Chance</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {items.map((item, idx) => {
                    return(
                        <TableRow key={idx}>
                            <TableCell><a href={`/${item.isComponent ? 'component' : 'item'}${item.uniqueName}`}>{item.drops.type}</a></TableCell>
                            <TableCell>{item.drops.chance*100 >= 1 ? Math.round(item.drops.chance * 100) : item.drops.chance * 100}%</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
            </TableContainer>
            </PageTemplate>
        )
    } else {
      return(<LoadingPage loading={this.state.loading} error={this.state.error} />)
    }
  }
}

export default ItemComponent