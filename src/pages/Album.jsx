import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.musicData();
  }

  musicData = async () => {
    // Match é um objeto que tem as informações de como o <Route path> correspondeu a URL,
    // e nela eu acceso os parametros que tem a id da música, link:
    // https://v5.reactrouter.com/web/api/match
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    // console.log(album);
    this.setState({
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      musics: [...album],
    });
  }

  render() {
    const { artistName, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        <MusicCard musics={ musics } />
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
