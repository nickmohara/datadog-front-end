import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

class FrequencyComponent extends React.Component {

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
            {this.props.name} Frequency
          </Typography>
          <Typography
            variant="h5"
            component="h2"
          >
            {(this.props.quantity)} event{(this.props.quantity !== 1 && 's')}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Since {moment.unix(this.props.startTime / 1000).format("h:mm A")}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default FrequencyComponent;
