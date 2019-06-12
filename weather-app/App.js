import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { API_KEY } from './utils/WeatherAPIKey'

import Weather from './components/Weather'

export default class App extends React.Component {
  state = {
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        })
      }
    )
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          name: json.name
        }, () => console.log(this.state, 'state'))
      })
  }



  render() {
    const { weatherCondition, temperature, name } = this.state
    return (
      <View style={styles.container}>
        {!weatherCondition ? <Text>Just Fetching The Weather</Text> : <Weather weather={weatherCondition} temperature={temperature} name={name} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
