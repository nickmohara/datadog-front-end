import React from 'react';

import {
  TimeSeries
} from "pondjs";

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
} from "react-timeseries-charts";

import {
  darkTheme
} from 'components/charts/chartStyles.jsx';

class LineChartComponent extends React.Component {

  render() {
    let points = this.props.loadAverages;
    let series = new TimeSeries({
        name: "cpu_over_time",
        columns: ["time", "value"],
        points
    });

    return (
      <Resizable style={{margin: '0px 10px 0px 10px'}}>
        <ChartContainer
          title="Current CPU (10 min lookback)"
          style={{
              background: "#201d1e",
              borderRadius: 8,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "#232122"
          }}
          timeAxisStyle={darkTheme}
          titleStyle={{
              color: "#EEE",
              fontWeight: 500
          }}
          padding={20}
          paddingTop={5}
          paddingBottom={0}
          timeRange={series.range()}
      >
          <ChartRow height="300">
            <YAxis
              id="cpu"
              label="CPU %"
              min={series.min()}
              max={series.max()}
              style={darkTheme}
              width="60"
              format=".3p"
            />
            <Charts>
              <LineChart
                axis="cpu"
                series={series}
                interpolation="curveBasis"
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}

export default LineChartComponent;
