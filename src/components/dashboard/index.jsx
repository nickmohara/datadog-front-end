import React from 'react';
import Header from 'components/header/header.jsx';
import Stats from 'components/views/stats.jsx';
import Charts from 'components/views/charts.jsx';

import {
  lookbackPeriod,
  fetchFrequency,
  highCpuThreshold,
  highCpuAlertThreshold,
  recoveryThreshold,
  stateInitial,
  stateHighCpu,
  stateRecovering,
  stateHasRecovered,
} from 'assets/constants.jsx';

let intervalId = 0;

class Index extends React.Component {

  state = {
    loadAverages: [],
    lastCpuUpdate: {},
    highCpuStartTime: null,
    recoveryStartTime: null,
    currentCpuState: stateInitial,
  }

  componentDidMount = () => {
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleFetchData();
    intervalId = setInterval(this.handleFetchData, fetchFrequency);
  }

  async handleFetchData() {
    try {
      const res = await fetch("/getUsage");
      const data = await res.json();

      this.handleUpdateCpuStats(data);
    } catch (e) {
      console.log('Server is not started. Please start the server and refresh the page.');
      clearInterval(intervalId);
    }
  }

  handleUpdateCpuStats = (data) => {
    let timestamp = data.timestamp;
    let cpu = data.loadAverage;
    let curLoadAvg = this.state.loadAverages;
    let currentCpuState = this.state.currentCpuState;
    let currentTimestamp = Date.now();

    // Remove first item in the array to account for the newest item while maintaining the exact lookbackPeriod
    if (curLoadAvg.length >= lookbackPeriod) {
      curLoadAvg.shift();
    }

    // Check if we are heavy CPU
    if (cpu >= highCpuThreshold) {
      let highCpuStartTime = this.state.highCpuStartTime;
      let secondsSinceHighCpuStarted = (currentTimestamp - highCpuStartTime) / 1000;

      // First time getting high cpu; let's record it
      if (!highCpuStartTime) {
        this.setState({
          highCpuStartTime: Date.now()
        })
      } else {
        // We have high CPU start time and it has been high long enough to alert the user
        // Lets update the state to reflect that
        if (secondsSinceHighCpuStarted > highCpuAlertThreshold &&
            currentCpuState !== stateHighCpu) {
          this.setState({
            currentCpuState: stateHighCpu
          })
        }
      }
    }

    if (cpu < highCpuThreshold) {

      // It was high CPU; now we just entered into recovery
      if (currentCpuState === stateHighCpu) {
        this.setState({
          currentCpuState: stateRecovering,
          recoveryStartTime: Date.now()
        })
      }

      // We are recovering; lets check to see if we successfully recovered
      // IE we have passed the threshold for recovery time
      if (currentCpuState === stateRecovering) {
        let recoveryStartTime = this.state.recoveryStartTime;
        let secondsSinceRecoveryStarted = (currentTimestamp - recoveryStartTime) / 1000;

        // Check to see if we have been recovering long enough to alert the user that we successfully recovered
        if (secondsSinceRecoveryStarted > recoveryThreshold) {
          this.setState({
            currentCpuState: stateHasRecovered,
            highCpuStartTime: null,
          })
        }
      }
    }

    this.setState((state) => ({
      loadAverages: [...curLoadAvg, [timestamp, cpu]],
      lastCpuUpdate: data
    }));
  }

  render() {
    return (
      <div>
        <Header />

        {this.state.loadAverages.length > 0 && (
          <div>
            <Stats
              lastCpuUpdate={this.state.lastCpuUpdate}
              highCpuStartTime={this.state.highCpuStartTime}
              recoveryStartTime={this.state.recoveryStartTime}
              currentCpuState={this.state.currentCpuState}
            />
            <Charts
              loadAverages={this.state.loadAverages}
            />
          </div>
        )}

      </div>
    );
  }
}

export default Index;
