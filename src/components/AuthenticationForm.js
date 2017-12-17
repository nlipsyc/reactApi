
import React, { Component } from 'react';

class Authenticator extends Component {
  constructor() {

    this.state = {
      authToken: '',
    };
  }

  componentDidMount(){
    fetch('https://sandbox.akira.md/api/auth', {
      method: 'post',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    }
  );
}

render(){

};
}
