import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import {
  highCpuThreshold,
  stateRecovering
} from 'assets/constants.jsx';

class TableHistoryComponent extends React.Component {

  renderHealthState = (cpu) => {
    return cpu < highCpuThreshold ? 'Healthy' : 'Unhealthy';
  }

  render() {
    return (
      <Paper
        style={{overflowX: 'auto', maxHeight: '370px'}}
      >
        <Table
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>
                State
              </TableCell>
              <TableCell
                align="right"
              >
                CPU
              </TableCell>
              <TableCell
                align="right"
              >
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {this.props.loadAverages.slice(0).reverse().map((data, index) => (

              <TableRow key={index}>
                <TableCell
                  style={{color: data[1] < highCpuThreshold ? 'green' : 'red'}}
                >
                    {this.renderHealthState(data[1])}
                </TableCell>
                <TableCell
                  align="right"
                >
                  {(data[1] * 100).toFixed(0)}%
                </TableCell>
                <TableCell
                  align="right"
                >
                  {moment.unix(data[0] / 1000).format("h:mm:ss A")}
                </TableCell>
              </TableRow>

            ))}

          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default TableHistoryComponent;
