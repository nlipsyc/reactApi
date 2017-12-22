import React, { Component } from 'react';

class SysStatus extends Component {
  constructor() {
    super();
    this.state = {
      isOpenForBusiness: null,
      openHoursToday: {
        // @TODO Make sure to display in local time
        // in the view
        open_at: '',
        close_at: '',
      },
    };
  };

  componentDidMount() {
    fetch('https://sandbox.akira.md/api/system_status', {
      method: 'get',
      mode: 'no-cors',
    })
    .then(results => {
      return results.json();
    })
  .then(data => {
      //@TODO make sure to check that system is online
      let isOpenForBusiness = data.is_open_for_business;
      let openHoursToday = data.open_hours_today;
      this.setState({
        isOpenForBusiness: isOpenForBusiness,
        openHoursToday: openHoursToday,
      });
      console.log(this.state);
    })
    .catch(err => {
      console.log('error caught =========');
    });
  };

  render() {
    var openMessage = (isOpen) => {
      if (isOpen) {
        return <p>On call now</p>;
      }

      return <p>Busniess hours are done for the day</p>;
    };

    var hoursMessage = (hours) => {
      /* If we start supporting French we can pass in a different
       locale from the state */
      const toTimeString = (dateString, locale='en-CA', format={ hour: '2-digit', minute: '2-digit' }) => {
        let dateObj = new Date(dateString);
        return new Date(dateObj + (offset * 60 * 1000)).toLocaleTimeString(locale, format);
      };

      const offset = new Date().getTimezoneOffset();
      /* If we start supporting French we can pass in a different
       locale from the state */
      const openTime = toTimeString(hours.open_at);
      const closeTime = toTimeString(hours.close_at);
      console.log('++++++', hours, openTime, closeTime);
      return <p>Hours of opperation: {openTime} - {closeTime}</p>;
    };

    if (!this.state.online) {
      return (
        <div className='container'>
        <div className="sysStatus">
          Akira is offline right now.  Please try again in a few minutes or
          contact us at <a href="mailto:support@akira.md">support@akira.md</a>
        </div>
        </div>
      );
    }

    return (
      <div className='container'>
      <div className="sysStatus">
        {openMessage(this.state.isOpenForBusiness)}
      </div>
      <div>
        open{hoursMessage(this.state.openHoursToday)}
      </div>
    </div>
    );
  }
}

export default SysStatus;
