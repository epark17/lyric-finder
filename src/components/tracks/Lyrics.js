import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    // album_cover: ''
  };

  async componentDidMount() {
    try {
      const track_id = this.props.match.params.id;

      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      );

      this.setState({ lyrics: data.message.body.lyrics });

      // another axios request
      return await axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${track_id}&apikey=${process.env.REACT_APP_MM_KEY}`
        )
        .then(res => {
          this.setState({ track: res.data.message.body.track });
        });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { track, lyrics } = this.state;
    // album image

    if (
      track === undefined ||
      lyrics === undefined ||
      !Object.keys(track).length ||
      !Object.keys(lyrics).length
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            {/* <img class="card-img-top" src={} alt={track.album_name}> */}
            <h5 className="card-header">
              {track.track_name} by{' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              {/* <strong>Album ID</strong>: {track.album_id} */}
              <strong>Album Name</strong>: {track.album_name}
            </li>
            <li className="list-group-item">
              <strong>Genre</strong>:{' '}
              {track.primary_genres.music_genre_list.length !== 0
                ? track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : 'N/A'}
            </li>

            <li className="list-group-item">
              <strong>Explicit</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
            </li>

            <li className="list-group-item">
              <strong>Release Date</strong>:{' '}
              <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
