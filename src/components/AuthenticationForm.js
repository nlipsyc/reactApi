import React, { Component } from 'react';
import MedicContainer from './MedicContainer';

class AuthenticationForm extends Component {
  constructor() {
    super();
    this.state = {
      authToken: '',
      userCreds: {
        userEmail: '',
        userPassword: '',
      },
      medicsOnCall: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    fetch('https://sandbox.akira.md/api/auth', {
      method: 'post',
      body: JSON.stringify({
        email: this.state.userCreds.userEmail,
        password: this.state.userCreds.userPassword,
      }),
    }
  )
  .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
  .then(auth => {
          console.log('AUTH', auth);
          const headers = new Headers({ 'Authorization': auth.token, });
          fetch('https://sandbox.akira.md/api/medics/on_call', {
            method: 'get',
            headers: headers,
            credentails: 'include',
            mode: 'cors',
          })
  .then(response => {
            console.log(response);
            if (response.ok) {
              return response.json();
            }
          })
  .then(medicsOnCall => {
            this.setState({ medicsOnCall: medicsOnCall });
          });
        });

    event.preventDefault();
  }

  handleChange = (fieldName) => (event) => {
    const auth = this.state.userCreds;
    const newAuth = {
      ...auth,
      [fieldName]: event.target.value,
    };
    this.setState({ userCreds: newAuth });
  };

  render() {
    return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Email
        <input type='text' onChange={this.handleChange('userEmail')} value={this.state.userCreds.userEmail}/>
        </label>
        <label>
          Password
          <input type='password' onChange={this.handleChange('userPassword')} value={this.state.userCreds.userPassword}/>
        </label>
        <input type='submit' value='Log in' />
      </form>
      <MedicContainer authToken={this.state.authToken} medicsOnCall={this.state.medicsOnCall} />
    </div>
  );
};
}

export default AuthenticationForm;
