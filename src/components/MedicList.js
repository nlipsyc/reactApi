import React, { Component } from 'react';

class MedicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medics: {},
    };
  }

  componentDidMount() {
    fetch('https://sandbox.akira.md/api/medics/on_call', {
      method: 'post',
      header: JSON.stringify({
        Authentication: sessionStorage.getItem('authToken'),
      }),
      credentails: 'include',
    }
  )
  .then(response => {
      return response.json();
    }
)
.then(data => {
      console.log('THIS IS THE MEDIC LIST DATA ', data);
    }
  );
  };

  render() {
    return (
      <p>MEDIC LIST</p>
    );
  };
}

export default MedicList;
