import React from 'react'
import Axios from 'axios'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Loading from '../../components/Loading'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

class WfdfUpdates extends React.Component {
  constructor(props) {
    super(props)
    this.state = { updates: undefined, error: false, loading: true }
  }

  componentDidMount() {
    Axios.get('/api/v1/wfdf/updates')
      .then(response => {
        if(response.data) this.setState({ updates: response.data, error: false, loading: false })
        else this.setState({ error: true, loading: false })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error: true, loading: false })
      })
  }

  render() {
    if(this.state.loading) {
      return(<Loading />)
    }
    else if(this.state.error || !this.state.updates) {
      return(<p>Unable to load Warframe Updates...</p>)
    }
    else {
      return(
      <div>
        <Grid container spacing={3}>
        {this.state.updates.map((update, idx) => {
          const updateFinishedDate = new Date(update.ended)
          const todayDate = new Date()
          const daysAgo = Math.round((todayDate - updateFinishedDate)/(1000*60*60*24));
          const daysAgoStr = daysAgo <= 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
          return(
            <Grid item key={idx} xs={12} md={4}>
              <Card className='decorativeBottomBorder'>
                <CardContent>
                  <Typography color='textSecondary' align='center' gutterBottom>
                    {update.type}
                    <br />
                    {daysAgoStr}
                  </Typography>
                  <Typography align='center'>
                    {update.type === 'Market' && <>
                      {update.update.items} items.
                      <br />
                      {update.update.components} components.
                    </>}
                    {update.type === 'Patchlogs' && <>
                      {update.update.majors} major updates.
                      <br />
                      {update.update.hotfixes} hotfixes.
                    </>}
                    {update.type === 'Items' && <>
                      {update.update.added} additions.
                      <br />
                      {update.update.changed} changes.
                    </>}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
        </Grid>
      </div>
      )
    }
  }
}

export default WfdfUpdates
