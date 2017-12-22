import React, { Component } from 'react';

class MedicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicsOnCall: {},
      authToken: '',
      loaded: false,
    };
  }

  componentWillReceiveProps (newProps) {
    console.log('WILL RECEIVE PROPS', newProps);
    if (true || newProps.medicsOnCall !== this.props.medicsOnCall) {
      this.setState({
        medicsOnCall: newProps.medicsOnCall,
        authToken: newProps.authToken,
        loaded: newProps.medicsOnCall.hasOwnProperty(0),
      });
    }
  }

  componentDidMount() {
    console.log('STATE SHOULD HAVE CHANGED', this.state);

    const avatarCalls = this.state.loaded ?
                        this.state.medicsOnCall.reduce(
                          (acc, key) => acc.push({ key: this.state.medicsOnCall[key].avatar.url }))
                        : null;
    console.log('avatar calls ----', avatarCalls);

    // fetch('https://sandbox.akira.md/api/medics/on_call', {
    //   method: 'get',
    //   headers: headers,
    //   credentails: 'include',
    //   mode: 'cors',
    // })
  }

  render() {
    return (
      this.state.loaded &&
      <div>
      <p>MEDIC LIST</p>
      </div>
    );
  };
}

export default MedicContainer;
