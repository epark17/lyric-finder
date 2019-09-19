import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import SingleTrack from './SingleTrack';

// check if the tracks are there and is the array empty or not, if array is empty -> spinner
class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {/* currently, the value = the entire state */}
        {value => {
          const { track_list, heading } = value;

          if (track_list === undefined || !track_list.length) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {track_list.map(item => (
                    <SingleTrack key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
