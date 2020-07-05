import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

const api = {
  key: "367a74a7ae79db566020532c745b1879",
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery();
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <main className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app-warm' : 'app') : 'app'}>
      <Header title="Homepage" />
      <div className="searchBox">
        <input type="text"
          className="searchInput"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="locationBox">
        <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} />
          <div className="locationName">{weather.name}, {weather.sys.country}</div>
          <div className="locationDate">{dateBuilder(new Date())}</div>
        </div>
        <div className="weatherBox">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
        <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>
      ) : ('')}
    </main>
  )
}

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand">{this.props.title}</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    )
  }
}

export default App;