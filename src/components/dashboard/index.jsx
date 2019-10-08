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
    startTime: Date.now(),
    loadAverages: [],
    lastCpuUpdate: {},
    highCpuStartTime: null,
    recoveryStartTime: null,
    currentCpuState: stateInitial,
    highCpuQuantity: 0,
    recoveryQuantity: 0
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

      this.handleUpdateCpuData(data);
      this.handleSetCpuState(data.loadAverage);
    } catch (e) {
      console.log('Server is not started. Please start the server and refresh the page.');
      clearInterval(intervalId);
    }
  }

  handleUpdateCpuData = (data) => {
    let timestamp = data.timestamp;
    let cpu = data.loadAverage;
    let curLoadAvg = this.state.loadAverages;

    // Remove first item in the array to account for the newest item while maintaining the exact lookbackPeriod
    if (curLoadAvg.length >= lookbackPeriod) {
      curLoadAvg.shift();
    }

    this.setState({
      loadAverages: [...curLoadAvg, [timestamp, cpu]],
      lastCpuUpdate: data
    });
  }

  handleSetCpuState = (cpu) => {
    let currentTimestamp = Date.now();
    let currentCpuState = this.state.currentCpuState;
    let currentHighCpuQuantity = this.state.highCpuQuantity;
    let currentRecoveryQuantity = this.state.recoveryQuantity;

    // We have high CPU
    if (cpu >= highCpuThreshold) {
      let highCpuStartTime = this.state.highCpuStartTime;

      if (!highCpuStartTime) {
        this.setState({
          highCpuStartTime: Date.now() // keep track of when the high CPU started
        })
      } else {
        let secondsSinceHighCpuStarted = (currentTimestamp - highCpuStartTime) / 1000;
        if (secondsSinceHighCpuStarted >= highCpuAlertThreshold &&
            currentCpuState !== stateHighCpu) {
          this.setState({
            currentCpuState: stateHighCpu,
            highCpuQuantity: currentHighCpuQuantity + 1
          })
        }
      }
    }

    // Just entered into recovery
    if (cpu < highCpuThreshold && currentCpuState === stateHighCpu) {
        this.setState({
          currentCpuState: stateRecovering,
          recoveryStartTime: Date.now()
        });
    }

    // Check to see if we have been recovering long enough to be fully recovered
    let recoveryStartTime = this.state.recoveryStartTime;
    let secondsSinceRecoveryStarted = (currentTimestamp - recoveryStartTime) / 1000;
    if (currentCpuState === stateRecovering && secondsSinceRecoveryStarted >= recoveryThreshold) {
      this.setState({
        currentCpuState: stateHasRecovered,
        recoveryQuantity: currentRecoveryQuantity + 1,
        highCpuStartTime: null,
      })
    }
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
              highCpuQuantity={this.state.highCpuQuantity}
              recoveryQuantity={this.state.recoveryQuantity}
              startTime={this.state.startTime}
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
