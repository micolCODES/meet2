import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen'; // Micol: Created a new component

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    warningText: '',
  }

  async componentDidMount() {
    this.mounted = true;
    
    //Micol: Get the token from localStorage
    const accessToken = localStorage.getItem('access_token');

    //Micol: Validate the accessToken if exists (true) otherwise false
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;

    //Micol: On redirection we get Google's code in the param, so we exclude that to show Welcome Screen
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    //Micol: Set showWelcomeScreen to true if no code or token exists, otherwise false
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    //Micol: Now get events only if code & token & mounted is true
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      }); 
    }
  }

  // Filters events based on location and number given in user input
  updateEvents = (location, eventCount) => {

    // Micol: Moved navigator check here, because its not in the componentDidMount for some reason :)
    if (!navigator.onLine) {
      this.setState({
        warningText: "You are offline! Events are loaded from the cache", // Micol: I modified the text
      });
    } else {
      this.setState({
        warningText: '',
      });
    }

    // Micol: If the eventCount is undefined, that means when the user change the city
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else {
      this.setState({ numberOfEvents: eventCount })
    }

    // Micol: If the location is undefined, that means when the user change the numberOfEvents
    if (location === undefined) {
      location = this.state.locationSelected;
    }

    // Micol: Get events and update the state!!!
    getEvents().then((events) => {
      let locationEvents = (location === 'all') 
        ? events : events.filter((event) => event.location === location);
          this.setState({
            events: locationEvents.slice(0, eventCount),
            numberOfEvents: eventCount,
            locationSelected: location,
      });
    });
  };

  // Gets total number of events happening in each city
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      // (', ') -> shorten the location and remove any unnecessary information and shift() array function to get the first element in the array(name od city)
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { locations, numberOfEvents } = this.state;
    // Micol: If the showWelcomeScreen is false only then show events otherwise show Welcome Screen
    if (!this.state.showWelcomeScreen) {
      return (
        <div className='App'>
          <h1 className = 'appTitle'>Meet App</h1>
          <h5>Upcoming events</h5>

          <CitySearch 
                      locations={locations} 
                      updateEvents={this.updateEvents} />

          <NumberOfEvents 
                      updateEvents={this.updateEvents}
                      numberOfEvents={numberOfEvents}/>
                      
          <div className='warningAlert'>
            <OfflineAlert text={this.state.warningText} />
          </div>
  
          <EventList events={this.state.events} />
        </div>
      )
    }
    else {
        return (<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => { getAccessToken() }} />)
    }
  }

}

export default App;
