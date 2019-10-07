import React from 'react';

let intervalId = 0;

class Index extends React.Component {
  
  state = {
    loadAverage: 0,
  }

  componentDidMount = () => {
    this.handleFetchData();
    intervalId = setInterval(this.handleFetchData, 10000);
  }

  async handleFetchData() {
    try {
      const res = await fetch("/getUsage");
      const data = await res.json();
      console.log(data);
    } catch (e) {
      // No response from server; it must not be on
      console.log('Server is not started. Please start the server and refresh the page.');
      clearInterval(intervalId);
    }
  }

  render() {
    return (
      <div>
        loadAverage: {this.state.loadAverage}
      </div>
    );
  }
}

export default Index;
