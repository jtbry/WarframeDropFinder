import React from 'react'
import Axios from 'axios'
import SearchFilter from './SearchFilter'
import Input from '@material-ui/core/Input'
import SearchResults from './SearchResults'
//import Badge from '@material-ui/core/Badge'
import SearchIcon from '@material-ui/icons/Search'
//import SettingsIcon from '@material-ui/icons/Settings';
import InputAdornment from '@material-ui/core/InputAdornment'

function randomItemName() {
  const possibleItems = ['Ash Prime', 'Saryn Prime', 
                         'Soma Prime', 'Ignis Wraith', 
                         'Lesion', 'Nikana Prime',
                         'Blood Rush', 'Split Chamber']
  return possibleItems[Math.floor(Math.random() * possibleItems.length)]
}

class ItemSearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTypingTimeout: undefined,
      searchResultsObject: undefined,
      showFilters: false,
      filters: undefined
    }
  }

  searchForItem(searchTerm) {
    if(!searchTerm || searchTerm.length < 3)  {
      this.setState({ searchResultsObject: undefined })
      return
    }
    Axios.post('/api/v1/search/items', { itemName: searchTerm, itemFilters: this.state.filters || {} })
      .then(response => {
        if(response.status === 200) {
          this.setState({ searchResultsObject: response.data })
        } else this.setState({ searchResultsObject: { error: true }})
      })
      .catch(error => {
        console.error(error)
        this.setState({ searchResultsObject: { error: true }})
      })
  }

  onInputChange(event) {
    if(this.state.searchTypingTimeout) clearTimeout(this.state.searchTypingTimeout)
    this.setState({
      searchTypingTimeout: setTimeout(() => this.searchForItem(event.target.value), 500)
    })
  }

  render() {
    const searchBarStyles = {
      background: 'white',
      borderRadius: (this.state.searchResultsObject ? '3px 3px 0px 0px' : '3px'),
      padding: '0 30px',
      width: (this.props.isNavbar ? '60%' : '40%')
    }
    // todo: figure out nicer looking way to indicate active filters
    // todo: resubmit existing search if filters change
    return(
      <>
        {this.state.showFilters && <SearchFilter updateFilters={(filters) => { this.setState({filters: filters}) }} /> }
        <Input
          style={searchBarStyles}
          type='search'
          onChange={(e) => this.onInputChange(e)}
          disableUnderline
          placeholder={`Search for anything... like ${randomItemName()}`}
          // TODO: search filter
          // startAdornment={
          //   <InputAdornment onClick={() => { this.setState({showFilters: !this.state.showFilters})}} position='start' style={{cursor: 'pointer'}}>
          //     {this.state.filters ?
          //       <Badge badgeContent={'!'} color='secondary' anchorOrigin={{horizontal: 'left', vertical: 'top'}}>
          //         <SettingsIcon color='primary' />
          //       </Badge>
          //     : <SettingsIcon color='primary' />}
          //   </InputAdornment>
          // }
          endAdornment={
            <InputAdornment position='end'>
              <SearchIcon color='primary'/>
            </InputAdornment>
          }
        />
        {this.state.searchResultsObject && <SearchResults results={this.state.searchResultsObject} />}
      </>
    )
  }
}

export default ItemSearchBar
