import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      cardImage,
      collectionId,
      cardCollection,
      cardArtist,
    } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div>
          <img src={ cardImage } alt={ cardArtist } />
          <p>{ cardCollection }</p>
          <p>{ cardArtist }</p>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  cardImage: PropTypes.string,
  collectionId: PropTypes.string,
  cardCollection: PropTypes.string,
  cardArtist: PropTypes.string,
}.isRequired;

export default Card;
