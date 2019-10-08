import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import 'components/header/header.css';

export default function ButtonAppBar() {
  return (
    <div
      className="header-root"
    >
      <AppBar
        position="static"
        className="header-app-bar"
      >
        <Toolbar>
          <Typography
            variant="h6"
          >
            Datadog CPU Monitor
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
