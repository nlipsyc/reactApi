import React, { Component } from 'react';

class MedicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicsInfo: {},
      medicsImages: {},
      loaded: false,
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.medicsInfo !== this.props.medicsInfo) {
      const loaded = newProps.medicsInfo ? newProps.medicsInfo.hasOwnProperty(0) : false;
      this.setState({
        medicsInfo: newProps.medicsInfo,
        medicsImages: newProps.medicsImages,
        loaded: loaded,
      });
    }
  }

// @MATT This would have eventually called a MedicCard for each medic
  render() {
    return (
      this.state.loaded &&
      <div>
        <h1>MEDIC LIST</h1>
        <p>{ JSON.stringify(this.state.medicsInfo) }</p>
      </div>
    );
  };
}

export default MedicContainer;
