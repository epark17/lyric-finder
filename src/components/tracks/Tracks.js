import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';

// check if the tracks are there and is the array empty or not
// if array is empty -> spinner
class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {/* currently, the value = the entire state */}
        {value => {
          const { track_list } = value;

          if (track_list === undefined || !track_list.length) {
            return <Spinner />;
          } else {
            return <h1>Tracks loaded</h1>;
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
