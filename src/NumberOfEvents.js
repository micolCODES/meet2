import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  
    state = { numberOfEvents: 32 };
  // this is my code
  //   handleChange = (e) => {
  //     const value = e.target.value;
  //     this.setState({ numberOfEvents: value });
  //   };
  
  //   render() {
  //     return (
  //       <div className='numberOfEvents'>
  //         <label>
  //           Number of Events:
  //           <input
  //             type='number'
  //             className='event-number'
  //             value={this.state.numberOfEvents}
  //             onChange={this.handleChange}
  //           />
  //         </label>
  //       </div>
  //     );
  //   }
  // }

  //this is git
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });

    if (value < 1) {
      this.setState({
        infoText: "Select number from 1 to 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="numberOfEvents">
        <label>Number of Events: </label>
        <input
          type="text"
          id="numberOfEvents__input"
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}

  export default NumberOfEvents;