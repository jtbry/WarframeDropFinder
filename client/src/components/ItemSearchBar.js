import React from 'react'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import { default as wfdfApi } from '../apis/wfdf'
import ItemSearchResults from './ItemSearchResults'

const styles = theme => ({
  searchBar: {
    background: 'white',
    borderRadius: '3px',
    padding: '0 30px',
    width: '70%'
  },
  searchBarWithResults: {
    background: 'white',
    borderRadius: '3px 3px 0px 0px',
    padding: '0 30px',
    width: '70%'
  }
})

class ItemSearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: undefined }
  }

  searchForItem(value) {
    if(value.trim() === '') {
      this.setState({data: undefined})
    } else {
      // todo: figure out how to make this use less requests.
      // currently if someone's typing a long name they'll make a request
      // with every keystroke, too much load on API for no reason
      if(value.length >= 3) {
        wfdfApi.searchForItem(value)
          .then(r => {
            this.setState({ data: r.data })
          })
          .catch(error => {
            console.error(error)
            this.setState({data: {error: true}})
          })
      }
    }
  }

  render() {
    // todo: filters menu / dropdown
    const styling = {}
    if(this.props.isNavbar) styling.backgroundColor = '#f2f2f2'
    if(this.state.data) {
      return(
        <div align="center">
          <Input
            className={this.props.classes.searchBarWithResults}
            style={styling}
            type="search"
            disableUnderline
            placeholder="Try searching Ash Prime..."
            onChange={(e) => { this.searchForItem(e.target.value) }}
          />
          <ItemSearchResults data={this.state.data} />
        </div>
      )
    } else {
      return(
        <div align="center">
          <Input
            className={this.props.classes.searchBar}
            style={styling}
            type="search"
            disableUnderline
            placeholder="Try searching Ash Prime..."
            onChange={(e) => { this.searchForItem(e.target.value) }}
          />
        </div>
      )
    }
  }
}

export default withStyles(styles)(ItemSearchBar)
