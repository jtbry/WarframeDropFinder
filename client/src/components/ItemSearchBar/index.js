import React from 'react'
import Axios from 'axios'
import Input from '@material-ui/core/Input'
import SearchResults from './SearchResults'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings';
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
      searchResultsObject: undefined
    }
  }

  searchForItem(searchTerm) {
    if(!searchTerm || searchTerm.length < 3)  {
      this.setState({ searchResultsObject: undefined })
      return
    }
    Axios.post('/api/v1/search/items', { itemName: searchTerm })
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
      width: '40%'
    }
    // todo: filters, clicking the startAdornment SearchIcon will
    // toggle a filter list where the user will select their filters
    // then hit apply. Apply these filters before making the search request
    return(
      <>
        <Input
          style={searchBarStyles}
          type='search'
          onChange={(e) => this.onInputChange(e)}
          disableUnderline
          placeholder={`Search for anything... like ${randomItemName()}`}
          startAdornment={
            <InputAdornment position='start'>
              <SettingsIcon color='primary'/>
            </InputAdornment>
          }
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
