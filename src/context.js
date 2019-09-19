import React, { Component } from 'react';
import axios from 'axios';

// creating Context
const Context = React.createContext();

// Reducer (dispatched action will go here)
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results',
      };
    default:
      return state;
  }
};

// not export default!
export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(state => reducer(state, action)),
  };

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
      // dispatch is also sent along as value (the whole state is being passed)
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// this is what we import into components for access to state from the context
// similar to Redux's connect
export const Consumer = Context.Consumer;
