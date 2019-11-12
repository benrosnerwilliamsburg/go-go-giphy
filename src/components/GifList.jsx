import React from 'react';

const GifList = (props) => {
  if (!props.gifs)
  return
  const gifs = props.gifs.map((gif,i) => {
    const isFavorite = props.favorites.filter(FavoriteGif => FavoriteGif.id === gif.id).length > 0 
    console.log("Favorite", isFavorite)
    return(
      <div onClick={() => props.handleFavorite(gif)} key={i} className="image">
        <img id={gif.id} src={gif.images.original.url} className="image" alt='gif' />
        {isFavorite ? <span>This has been favorited!</span> : ""} 
      </div>
    )
  });
  return (
    <div className="gif-list">
      {gifs}
    </div>
  );
};


export default GifList;
