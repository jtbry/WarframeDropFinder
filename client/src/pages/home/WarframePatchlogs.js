import React from 'react'
import Axios from 'axios'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Loading from '../../components/Loading'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

class WarframePatchlogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { patchlogs: undefined, error: false, loading: true }
  }

  componentDidMount() {
    Axios.get('/api/v1/wfdf/patchlogs')
      .then(response => {
        if(response.data) this.setState({ patchlogs: response.data, error: false, loading: false })
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
    else if(this.state.error || !this.state.patchlogs) {
      return(<p>Unable to load Warframe Patchlogs...</p>)
    }
    else {
      return(
      <div>
        <Grid container spacing={3}>
        {this.state.patchlogs.map((patchlog, idx) => {
          const patchlogDate = new Date(patchlog.date)
          const todayDate = new Date()
          const daysAgo = Math.round((todayDate - patchlogDate)/(1000*60*60*24));
          const daysAgoStr = daysAgo <= 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
          const updateSplit = patchlog.name.split(':')
          const majorName = updateSplit[0]
          updateSplit.splice(0, 1)
          const minorName = updateSplit.join(' ')

          return(
            <Grid item key={idx} xs={12} md={3}>
              <Card className='decorativeBottomBorder'>
                <CardContent>
                  <Typography color='textSecondary' align='center' gutterBottom>{daysAgoStr}</Typography>
                  <Typography align="center">
                    {majorName}
                    <br />
                    {minorName}
                  </Typography>
                </CardContent>
                <Typography align="center" gutterBottom>
                  <Button href={patchlog.link} target="_blank">
                    See Full Patchlog
                  </Button>
                </Typography>
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

export default WarframePatchlogs
