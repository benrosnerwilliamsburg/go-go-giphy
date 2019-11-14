import React from 'react';
import './GifList.css';

const GifList = (props) => {
  if (!props.gifs) return;
  const gifs = props.gifs.map((gif, i) => {
    const isFavorite = props.favorites.filter((favGif) => favGif.id === gif.id).length > 0;
    return (
      <div onClick={() => props.handleFavorite(gif)} key={i} className="image">
        <img id={gif.id} src={gif.images.fixed_width.url} className="image" alt={gif.images.slug} />
        {isFavorite ? <span> &hearts; </span> : ''}
      </div>
    );
  });

  return <div className="gif-list">{gifs}</div>;
};

export default GifList;
