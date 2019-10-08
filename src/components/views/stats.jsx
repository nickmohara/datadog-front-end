import React from 'react';
import Grid from '@material-ui/core/Grid';
import CurrentCpu from 'components/cards/currentCpu.jsx';
import Health from 'components/cards/health.jsx';
import Frequency from 'components/cards/frequency.jsx';

class CurrentCpuComponent extends React.Component {

  render() {
    return (
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs
        >
          <CurrentCpu
            lastCpuUpdate={this.props.lastCpuUpdate}
          />
        </Grid>
        <Grid
          item
          xs
        >
          <Health
            lastCpuUpdate={this.props.lastCpuUpdate}
            currentCpuState={this.props.currentCpuState}
            highCpuStartTime={this.props.highCpuStartTime}
            recoveryStartTime={this.props.recoveryStartTime}
          />
        </Grid>
        <Grid
          item
          xs
        >
          <Frequency
            name="High CPU"
            quantity={this.props.highCpuQuantity}
            startTime={this.props.startTime}
          />
        </Grid>
        <Grid
          item
          xs
        >
          <Frequency
            name="Recovery"
            quantity={this.props.recoveryQuantity}
            startTime={this.props.startTime}
          />
        </Grid>
      </Grid>
    );
  }
}

export default CurrentCpuComponent;
