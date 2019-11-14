import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import Search from './components/Search';
import config from './config';
import GifList from './components/GifList';
import Favorites from './components/Favorites';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      results: [],
      favorites: [],
    };

    this.getGifData = this.getGifData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async getGifData(event) {
    event.preventDefault();

    const { searchValue } = this.state;

    try {
      // TODO: Before making the request, set state to fetching: true and show some sort
      // of loading indication like: fetching gifs... or a spinner.
      const response = await axios.get(
        `${config.API_URL}?api_key=${config.API_TOKEN}&q=${searchValue}`,
      );

      this.setState({
        results: response.data.data,
      });
    } catch (error) {
      // TODO(SW): Add error handling logic so that if the request to giphy some sort
      // of failure message is shown. Something like:
      // 'Uups something went wrong..., try again!'.
      console.error(error);
    }
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  async handleFavorite(id) {
    // TODO: Add logic so that gifs that were already added are not re-added.
    // If id already exists in the array then do nothing and return.
    this.setState((state) => ({
      favorites: [...state.favorites, id],
    }));
  }

  render() {
    const { favorites, results } = this.state;

    return (
      <div className="App">
        <div className="header">
          <h1>Go Go Giphy</h1>
        </div>
        <div className="nav-bar">
          <div className="home-link">
            <Link to="/">Home</Link>
          </div>
          <div className="favorites-link">
            <Link to="/Favorites">Favorites</Link>
          </div>
        </div>
        <div className="search-container">
          <Search
            getGifData={this.getGifData}
            handleChange={this.handleChange}
          />
        </div>
        <div className="gif-list">
          <Route
            exact
            path="/"
            render={() => (
              <GifList
                handleFavorite={this.handleFavorite}
                gifs={results}
                favorites={favorites}
              />
            )}
          />
          <Route
            path="/Favorites"
            render={() => <Favorites favorites={favorites} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
