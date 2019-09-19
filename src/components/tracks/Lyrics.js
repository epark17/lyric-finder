import React, { Component } from 'react';
import axios from 'axios';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  async componentDidMount() {
    try {
      const track_id = this.props.match.params.id;
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      console.log('from Lyrics', data);
      // this.setState({ track_list: data.message.body.track_list });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <h1>Lyrics</h1>
      </div>
    );
  }
}

export default Lyrics;
