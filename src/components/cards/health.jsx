import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import {
  stateInitial,
  stateHighCpu,
  stateRecovering,
  stateHasRecovered
} from 'assets/constants.jsx';

class HighCpuComponent extends React.Component {

  render() {
    return (
      <Card
        style={{margin: '20px 10px 20px 10px'}}
      >
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
          >
            Current State
          </Typography>
          <Typography
            variant="h5"
            component="h2"
          >
            {
              this.props.currentCpuState === stateInitial || this.props.currentCpuState === stateHasRecovered ?
              'Healthy' :
              (
                this.props.currentCpuState === stateHighCpu ?
                'Unhealthy' :
                'Recovering'
              )
            }
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {
              this.props.currentCpuState === stateInitial &&
              '-'
            }
            {
              this.props.currentCpuState === stateHighCpu &&
              `Experiencing high CPU since ${moment.unix(this.props.highCpuStartTime / 1000).format("h:mm:ss A")}`
            }
            {
              this.props.currentCpuState === stateRecovering &&
              `Attempting to recover at ${moment.unix(this.props.recoveryStartTime / 1000).format("h:mm:ss A")}`
            }
            {
              this.props.currentCpuState === stateHasRecovered &&
              `Successfully recovered at ${moment.unix(this.props.recoveryStartTime / 1000).format("h:mm:ss A")}`
            }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default HighCpuComponent;
