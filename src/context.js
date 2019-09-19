import React, { Component } from 'react';
import axios from 'axios';

// creating Context
const Context = React.createContext();
// not export default!
export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
  };

  // instead of dummy data, using musixmatch api
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      this.setState({ track_list: data.message.body.track_list });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// this is what we import into components for access to state from the context
// similar to Redux's connect
export const Consumer = Context.Consumer;
