
import React, { Component } from 'react';

class AuthenticationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: '',
      userCreds: {
        userEmail: '',
        userPassword: '',
      },
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
        response.json().then((data) => {
          const responseData = data;
          this.setState({ authToken: responseData.token });
        });
      };
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
  );
};
}

export default AuthenticationForm;
