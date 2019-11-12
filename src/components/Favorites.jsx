import React from 'react';

const Favorites = (props) => {
  if (!props.favorites)
  return
  const favoriteGifs = props.favorites.map((favorite,i) => {
    return(
      <div onClick={() => props.handleFavorite(favorite)} key={i} className="image">
        <img id={favorite.id} src={favorite.images.fixed_width.url} className="image" alt={favorite.images.slug} />
      </div>
    )
  });
  return (
    <div className="favorites-list">
      {favoriteGifs}
    </div>
  );
};


export default Favorites;