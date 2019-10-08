import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import {
  highCpuThreshold
} from 'assets/constants.jsx';

import 'components/cards/currentCpu.css';

class CurrentCpuComponent extends React.Component {

  render() {
    return (
      <Card
        className="card-wrapper"
      >
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
          >
            Current CPU
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            className={this.props.lastCpuUpdate.loadAverage > highCpuThreshold ? 'color-danger' : 'color-safe'}
          >
            {(this.props.lastCpuUpdate.loadAverage * 100).toFixed(0)}%
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Last Updated: {moment.unix(this.props.lastCpuUpdate.timestamp / 1000).format("h:mm:ss A")}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default CurrentCpuComponent;
