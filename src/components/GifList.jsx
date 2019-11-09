import React from 'react';
import config from './config';

const GifList = (props) => {
  const gifs = props.gifs.map(gif => (
      <div className="image">
        <img className="image" src={gif.images.url} alt={gif.images.slug} />
      </div>
  ));
  return (
    <div className="gif-list">
      {gifs}
    </div>
  );
};


export default GifList;
