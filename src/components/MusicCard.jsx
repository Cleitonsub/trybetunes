import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.checkFavorites();
  }

  // Para a lógica do check eu contei com a ajuda do nosso amigo RafaelCunhaS,
  // meu parceiro do projeto Trivia, link: https://github.com/RafaelCunhaS
  checkFavorites = async () => {
    this.setState({
      loading: false,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: true,
      favoritesSongs: [...favorites],
    });
  }

  handleChange = async ({ target }) => {
    const { musics } = this.props;
    // Aqui eu encontro o obj da música que tem o mesmo id que está no target
    const song = musics.find((music) => music.trackId === Number(target.id));
    this.setState({
      loading: false,
    });

    if (!target.checked) {
      await removeSong(song);
    } else {
      await addSong(song);
    }

    this.setState({
      loading: true,
    });
    this.checkFavorites();
  }

  render() {
    const { musics } = this.props;
    const { loading, favoritesSongs } = this.state;
    return (
      <ul>
        {!loading && <Loading />}
        {musics.map((music) => (
          music.previewUrl
          && (
            <li key={ music.trackName }>
              {music.trackName}
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ music.trackId }>
                Favorita
                <input
                  type="checkbox"
                  id={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                  name={ music.trackId }
                  className="checkbox"
                  onChange={ this.handleChange }
                  checked={ favoritesSongs
                    .some((song) => song.trackId === music.trackId) }
                />
              </label>
            </li>)
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: propTypes.arrayOf(propTypes.any).isRequired,
};

export default MusicCard;
