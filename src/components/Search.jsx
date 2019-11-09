import React from 'react';

import './Search.css';


function Search(props) {
  return (
    <>
      <div className="search-container">
        <form onSubmit={event => props.onSubmit(event)}>
          <input type="text" className="search-input" value={props.value} name={props.name} onChange={event => props.onChange(event)} placeholder="Search for GIFs" />
          <button className="container-button">Go Go Giphy!</button>
        </form>
      </div>
    </>
  );
}

export default Search;
