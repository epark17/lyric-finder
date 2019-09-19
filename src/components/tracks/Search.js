import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    track_title: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // using dispatch to update context state
  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search for a Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="track_title"
                    value={this.state.track_title}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
