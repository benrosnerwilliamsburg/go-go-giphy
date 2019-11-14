import React from 'react';
import './GifList.css';
import PropTypes from 'prop-types';

const GifList = ({ gifs, favorites, handleFavorite }) => {
  if (!gifs) return;

  const gfs = gifs.map((gif, i) => {
    const isFavorite =
      favorites.filter((favGif) => favGif.id === gif.id).length > 0;
    return (
      <div key={i} className="image" onClick={() => handleFavorite(gif)}>
        <img
          id={gif.id}
          src={gif.images.fixed_width.url}
          className="image"
          alt={gif.images.slug}
        />
        {isFavorite ? <span> &hearts; </span> : ''}
      </div>
    );
  });

  return <div className="gif-list">{gfs}</div>;
};

GifList.propTypes = {
  gifs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default GifList;
