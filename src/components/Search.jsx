import React from 'react';
import './Search.css';

function Search(props) {
  return (
    <>
      <div className="search-container">
        <form onSubmit={props.getGifData}>
          <input
            type="text"
            className="search-input"
            value={props.value}
            name={props.name}
            onChange={props.handleChange}
            placeholder="Search for GIFs"
          />
          <button className="container-button">Go Go Giphy!</button>
        </form>
      </div>
    </>
  );
}

export default Search;
