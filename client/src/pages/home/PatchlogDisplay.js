import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import PatchlogCard from '../../components/PatchlogCard'
import { default as wfdfApi } from '../../apis/wfdf'

class PatchlogDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: false, data: undefined }
  }

  componentDidMount() {
    wfdfApi.getRecentPatchlogs()
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
        <h4>Sorry, we couldn't load the patchlogs right now.</h4>
      )
    }
    if(this.state.data) {
      return(
        <Grid container spacing={1}>
          {this.state.data.map(patchlog => {
            return(
              <Grid key={patchlog.name} item md>
                <PatchlogCard data={patchlog} />
              </Grid>
            )
          })}
        </Grid>
      )
    }
  }
}

export default PatchlogDisplay