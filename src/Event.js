import React, { Component } from "react";
import './Event.css';
import moment from "moment";

//this is my code
// class Event extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isVisible: false,
//     }
//   }


//   clickHandler = () => {
//     this.setState({isVisible: !this.state.isVisible});
//   };

//   render() {
//   const isVisible = this.state.isVisible;
//   const { event } = this.props;

//     return (
//       <div className='details__outer-container'>
//         <h2>{event.summary}</h2>
//         <p>{event.description}</p>
//         <button className='details__toggle' onClick={this.clickHandler}> 
//           <span className={isVisible ? "details__toggle--show-text" : "details__toggle--show-text visible"}>Show</span>
//           <span className={isVisible ? "details__toggle--hide-text visible" : "details__toggle--hide-text"}>Hide</span>
//         </button>
//         <div className={isVisible ? "details__inner-container visible" : "details__inner-container"}>
//           <p>Location: {event.location}</p>
//           <p>From: {event.start.dateTime}</p>
//           <p>Until: {event.end.dateTime}</p>
//         </div>
//       </div>
//     );
//   }
// }

// this is git
class Event extends Component {
  state = {
    showDetails: false,
  };

  render() {
    const {
      summary,
      location,
      start,
      htmlLink,
      description,
    } = this.props.event;
    const eventStart = moment(start.dateTime, "YYYY-MM-DD HH:mm").toDate();
    const { showDetails } = this.state;
    return (
      <div className="event">
        <div className="event__Overview">
          <h2 className="event__Overview--name">{summary}</h2>
          <p className="event__Overview--localDate">{`${eventStart}`}</p>
          {location && (
            <p className="event__Overview--venue">
              @{summary} | {location}
            </p>
          )}
          {showDetails && (
            <button
              className="details-btn"
              onClick={() => this.setState({ showDetails: !showDetails })}
            >
              hide details
            </button>
          )}

          {!showDetails && (
            <button
              className="details-btn"
              onClick={() => this.setState({ showDetails: !showDetails })}
            >
              show details
            </button>
          )}
        </div>
        {showDetails && (
          <div className="event__Details">
            <h3>About event:</h3>
            <h4>
              <a href={htmlLink} target="_blank" rel="noopener noreferrer">
                See details on Google Calendar
              </a>
            </h4>
            <p
              className="event__Details--description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </div>
    );
  }
}


export default Event