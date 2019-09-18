import React, { Component } from 'react';
import axios from 'axios';

// creating the Context
const Context = React.createContext();

// not export default!
export class Provider extends Component {
  state = {
    track_list: [
      // { track: { track_name: 'Intro: Persona' } },
      // { track: { track_name: 'Boy with Luv' } },
      // { track: { track_name: 'Mikrokosmos' } },
      // { track: { track_name: 'Make It Right' } },
      // { track: { track_name: 'Home' } },
      // { track: { track_name: 'Jamais Vu' } },
      // { track: { track_name: 'Dionysus' } },
    ],
    heading: 'Top 10 Tracks',
    // Map of the Soul: Persona
  };

  // instead of dummy data, using musixmatch api
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      // console.log(data);
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
