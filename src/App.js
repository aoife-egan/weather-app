import React from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'
import { async } from 'q';

const API_KEY = '';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    //stops full page refresh
    e.preventDefault();

    //get value of whatever inputted into input
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}
    &appid=${API_KEY}&units=metric`);

    //convert to JSON format
    const data = await api_call.json();
    console.log(data);
    if(city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city and country"
      });
    }
  }
  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />
      </div>      
    );
  }
}
export default App;