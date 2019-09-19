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

  handleTrackSearchSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.track_title}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      console.log('Search.js', data);
      // this.setState({ track_list: data.message.body.track_list });
    } catch (err) {
      console.error(err);
    }
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

              <form onSubmit={this.handleTrackSearchSubmit}>
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
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
