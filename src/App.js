import React from 'react';
import axios from 'axios';
import Search from './components/Search'
import config from './components/config'
import GifList from './components/GifList'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      searchValue: '',
      searchResult: [],
      isLoaded: false
    };
  this.getGifData = this.getGifData.bind(this);
  this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  this.handleSearchResultClick = this.handleSearchResultClick.bind(this)
  this.handleChange = this.handleChange.bind(this);
}

async getGifData() {
  try {
    const response = await axios.get(`${config.API_URL}?api_key=${config.API_TOKEN}&q=${this.state.searchValue}`);
    const results = response.data;
    this.setState(state => ({
      gifs: [...state.searchResult, ...results]
    }));
  } catch (error) {
    console.error(error);
  }
}

async handleSearchSubmit(event) {
  event.preventDefault();
  try {
    const response = await axios.get(`${config.API_URL}?api-key=${config.API_TOKEN}&q=${this.state.searchValue}`);
    const searchResult = response.data.results;
    this.setState({
      gifs: searchResult
    });
  } catch (error) {
    console.error(error);
  }
}

async handleSearchResultClick(gifs) {
  await this.setState(state => ({
    searchValue: [...state.searchValue, gifs]
  }));
  await this.getGifData;
}

handleChange(event) {
  this.setState({
    searchValue: event.target.value
  });
}

async componentDidMount() {
  await this.getGifData();
  await this.setState(state => ({
    isLoaded: !state.isLoaded
  }));
}

render() {
  return (
    <div className="App">
      <div className="search-container">
      <Search/>
      </div>
      <div className="gif-list">
        <GifList gifs={this.state.gifs} />
      </div>
    </div>
  );
}
}

export default App;
