import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import Search from './components/Search'
import config from './components/config'
import GifList from './components/GifList'
import Favorites from './components/Favorites'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      searchValue: '',
      results: [],
      isLoaded: false,
      favorites: []
    };
  this.getGifData = this.getGifData.bind(this);
  this.handleSearchResultClick = this.handleSearchResultClick.bind(this)
  this.handleChange = this.handleChange.bind(this);
  this.handleFavorite = this.handleFavorite.bind(this);
}

async getGifData(event) {
  event.preventDefault()
  try {
    const response = await axios.get(`${config.API_URL}?api_key=${config.API_TOKEN}&q=${this.state.searchValue}`)
        this.setState({
            results: response.data.data
        })
      }
  catch (error) {
    console.error(error);
  }
}

async handleSearchResultClick(gifs) {
  await this.setState(state => ({
    searchValue: [...state.searchValue, gifs]
  }));
  await this.getGifData(this.state.searchValue);
}

handleChange(event) {
  this.setState({
    searchValue: event.target.value
  });
}

async handleFavorite(id) {
  this.setState(state => ({
    favorites: [...state.favorites, id]
  }))
}

async componentDidMount() {
  await this.setState(state => ({
    isLoaded: !state.isLoaded
  }));
}

render() {
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
        <Search getGifData={this.getGifData} handleChange={this.handleChange}/>
      </div>
      <div className="gif-list">
      { this.state.isLoaded
          && <Route exact path="/" render={() =>
            (<GifList handleFavorite={this.handleFavorite} gifs={this.state.results} favorites={this.state.favorites} />)} />
      }
        <Route path="/Favorites" render={() => (<Favorites favorites={this.state.favorites}/>)} />
      </div>
    </div>
  );
}
}

export default App;
