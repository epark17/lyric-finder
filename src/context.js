import React, { Component } from 'react';

// creating the Context
const Context = React.createContext();

// not export default!
export class Provider extends Component {
  state = {
    track_list: [
      { track: { track_name: 'Intro: Persona' } },
      { track: { track_name: 'Boy with Luv' } },
      { track: { track_name: 'Mikrokosmos' } },
      { track: { track_name: 'Make It Right' } },
      { track: { track_name: 'Home' } },
      { track: { track_name: 'Jamais Vu' } },
      { track: { track_name: 'Dionysus' } },
    ],
    heading: 'Top 10 Tracks',
    // Map of the Soul: Persona
  };

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
