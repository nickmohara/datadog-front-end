import React from 'react';
import Grid from '@material-ui/core/Grid';
import LineChart from 'components/charts/lineChart.jsx';
import HistoryTable from 'components/charts/historyTable.jsx';

class CurrentCpuComponent extends React.Component {

  render() {
    return (
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={8}
        >
          <LineChart
            loadAverages={this.props.loadAverages}
          />
        </Grid>
        <Grid
          item
          xs={4}
        >
          <HistoryTable
            loadAverages={this.props.loadAverages}
            currentCpuState={this.props.currentCpuState}
          />
        </Grid>
      </Grid>
    );
  }
}

export default CurrentCpuComponent;
