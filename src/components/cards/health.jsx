import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import 'components/cards/health.css';

import {
  stateInitial,
  stateHighCpu,
  stateRecovering,
  stateHasRecovered
} from 'assets/constants.jsx';

class HighCpuComponent extends React.Component {

  renderHealthStatus = () => {
    if (this.props.currentCpuState === stateInitial ||
        this.props.currentCpuState === stateHasRecovered) {
      return 'Healthy';
    }

    if (this.props.currentCpuState === stateHighCpu) {
      return 'Unhealthy';
    }

    return 'Recovering';
  }

  renderHealthSubtext = () => {
    if (this.props.currentCpuState === stateInitial) {
      return '-';
    }

    if (this.props.currentCpuState === stateHighCpu) {
      return `Experiencing high CPU since ${moment.unix(this.props.highCpuStartTime / 1000).format("h:mm:ss A")}`;
    }

    if (this.props.currentCpuState === stateRecovering) {
      return `Attempting to recover at ${moment.unix(this.props.recoveryStartTime / 1000).format("h:mm:ss A")}`;
    }

    return `Successfully recovered at ${moment.unix(this.props.recoveryStartTime / 1000).format("h:mm:ss A")}`;
  }

  renderCardCss = () => {
    if (this.props.currentCpuState === stateInitial ||
        this.props.currentCpuState === stateHasRecovered) {
      return 'card-color-safe';
    }

    if (this.props.currentCpuState === stateHighCpu) {
      return 'card-color-danger';
    }

    return 'card-color-recover';
  }

  render() {
    return (
      <Card
        className="card-wrapper"
      >
        <CardContent
          className={this.renderCardCss()}
        >
          <Typography
            className="text-secondary"
            gutterBottom
          >
            Current State
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            className="text-primary"
          >
            {this.renderHealthStatus()}
          </Typography>
          <Typography
            variant="body2"
            className="text-secondary"
          >
            {this.renderHealthSubtext()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default HighCpuComponent;
