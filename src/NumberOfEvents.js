import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  
  state = { numberOfEvents: 12 }; // Micol: I default the numberOfEvents to 12, I think its said somewhere in the exercise

  //this is git
  handleInputChanged = (event) => {
    let eventCount = parseInt(event.target.value)
    if (eventCount > 0 && eventCount <= 32) {
        this.setState({ 
            numberOfEvents: eventCount,
            errorText: ''
          });
    } else { // shows the error if the number is not between 1 and 32
        this.setState({ 
            numberOfEvents: 12,
            errorText: 'Please choose a number between 1 and 32.'
        });
        eventCount = 12;
    }

    // Micol: We call updateEvents of App.js
    this.props.updateEvents(undefined, eventCount);
  };

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div>            
         <div className="numberOfEvents">             
             <label htmlFor="number-of-events">Number of Events: </label>                                
             {/* Micol: Instead of TextBox, we use number type with min and max set */}
             <input
                 type="number"
                 className="number-of-events"
                 min="1" 
                 max="32"
                 value={numberOfEvents}
                 onChange={this.handleInputChanged}
             />
         </div>
         <div className="errorAlert">
             <ErrorAlert  text={this.state.errorText} />
         </div>
     </div>

 )
  }
}

  export default NumberOfEvents;