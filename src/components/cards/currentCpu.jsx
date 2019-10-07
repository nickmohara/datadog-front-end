import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

class CurrentCpuComponent extends React.Component {

  render() {
    return (
      <Card style={{margin: '20px 10px 20px 10px'}}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Current CPU
          </Typography>
          <Typography variant="h5" component="h2">
            {(this.props.lastCpuUpdate.loadAverage * 100).toFixed(0)}%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Last Updated: {moment.unix(this.props.lastCpuUpdate.timestamp / 1000).format("h:mm:ss A")}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default CurrentCpuComponent;
