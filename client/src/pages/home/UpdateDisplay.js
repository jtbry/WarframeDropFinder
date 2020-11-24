import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { default as wfdfApi } from '../../apis/wfdf'
import UpdateCard from '../../components/UpdateCard'

class UpdateDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: false, data: undefined }
  }

  componentDidMount() {
    wfdfApi.getRecentUpdates()
      .then(response => {
        this.setState({ loading: false, data: response.data })
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false, error: true })
      })
  }

  render() {
    if(this.state.loading) {
      return(
        <CircularProgress color="primary" />
      )
    }
    if(this.state.error) {
      return(
        <h4>Sorry, we couldn't load the updates right now.</h4>
      )
    }
    if(this.state.data) {
      return(
        <Grid container spacing={1}>
          {this.state.data.map(update => {
            return(
              <Grid key={update.hash} item md>
                <UpdateCard data={update} />
              </Grid>
            )
          })}
        </Grid>
      )
    }
  }
}

export default UpdateDisplay