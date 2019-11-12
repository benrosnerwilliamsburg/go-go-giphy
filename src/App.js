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
      results: [],
      isLoaded: false,
      favorites: []
    };
  this.getGifData = this.getGifData.bind(this);
  // this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  this.handleSearchResultClick = this.handleSearchResultClick.bind(this)
  this.handleChange = this.handleChange.bind(this);
  this.handleFavorite = this.handleFavorite.bind(this);
}

async handleFavorite(id) {
  this.setState(state => ({
    favorites: [...state.favorites, id]
  }))
}
async getGifData(event,searchValue) {
  event.preventDefault()
  try {
    const response = await axios.get(`${config.API_URL}?api_key=${config.API_TOKEN}&q=${this.state.searchValue}`)
    console.log(response)  
      console.log('response',response)
        this.setState({
            results: response.data.data
        })
      }
  catch (error) {
    console.error(error);
  }
}

// async handleSearchSubmit(event) {
//   event.preventDefault();
//   try {
//     const response = await axios.get(`${config.API_URL}?api-key=${config.API_TOKEN}&q=${this.state.searchValue}`);
//     const searchResult = response.data.results;
//     this.setState({
//       gifs: searchResult
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

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

async componentDidMount() {
  // await this.getGifData();
  await this.setState(state => ({
    isLoaded: !state.isLoaded
  }));
}

render() {
  return (
    <div className="App">
      <div className="search-container">
      <Search getGifData={this.getGifData} handleChange={this.handleChange}/>
      </div>
      <div className="gif-list">
        <GifList handleFavorite={this.handleFavorite} gifs={this.state.results} favorites={this.state.favorites} />
      </div>
    </div>
  );
}
}

export default App;
