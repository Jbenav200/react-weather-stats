import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function App() {

  

  return (
    <div className="App">
      <Map width="100%" height="100%" />
    </div>
  );
}

export default App;

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 55.860916,
    longitude: -4.251433,
    zoom: 8
  });

  const [state, setState] = useState({
    city:'',
    country: '',
  });

  const updateCity = (e) => {
    setState({city: e.target.value});
  }

  const updateCountry = (e) => {
    setState({country: e.target.value});
  }

  const requestOptions = {
    method: 'GET',
    headers:{
      'X-Api-Key': '8JLQFVSDfb8kGfwPTaL4ZA==RBbP0lSz3S8qB2cw',
      'Content-Type': 'application/json',
    }
  }

  const getLongLat = () => {
    fetch(`https://api.api-ninjas.com/v1/geocoding?city=${state.city}&country=${state.country}`, requestOptions)
    .then(response => response.json())
    .then((data) => {
      const newViewport = {
        width: "100vw",
        height: "100vh",
        longitude: data[0].longitude,
        latitude: data[0].latitude,
        zoom: 10
      };
      setViewport(newViewport);
    });
  }

  const getWeather = () =>{
    console.log(state.city);
    fetch(`https://api.api-ninjas.com/v1/weather?city=${state.city}`, requestOptions)
    .then(response => response.json())
    .then((response) => {
      console.log(`Temperature: ${response.temp} celcius.`);
    })
    .catch((error) => console.log(`Error: ${error}`));
  }

  const getData = () => {
    getLongLat();
    getWeather();
    
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(viewport) => {setViewport(viewport);}}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/jbenav200/cktq5dwd72vjn17p6smoh4qr8"
    >
      <InputGroup>
        <InputGroup.Text>City:</InputGroup.Text>
        <FormControl aria-label="Input City" placeholder="enter city" onChange={updateCity} />
        <InputGroup.Text>Country Code:</InputGroup.Text>
        <FormControl aria-label="Input City" placeholder="enter country" onChange={updateCountry} />
        <Button variant="success" onClick={getData}>Search</Button>
      </InputGroup>
    </ReactMapGL>
  );
}