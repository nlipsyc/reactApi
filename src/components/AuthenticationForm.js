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
      medicsInfo: {},
      medicsImages: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    fetch('https://cors-anywhere.herokuapp.com/https://sandbox.akira.md/api/auth', {
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
          this.setState({ authToken: auth.token });
          fetch('https://cors-anywhere.herokuapp.com/https://sandbox.akira.md/api/medics/on_call', {
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
            this.setState({ medicsInfo: medicsOnCall });

            const headers = new Headers({ 'Authorization': this.state.authToken, });
            console.log(medicsOnCall);

            // @MATT None of this is working, and it's *not* good code
            // but I'm leaving it here to show that I at least
            // tried to get something out
            //
            //   Promise.all(
            //     Object.keys(medicsOnCall).map((k) =>
            //     Promise.all([
            //       k,
            //       fetch(medicsOnCall[k].avatar.url, {
            //         method: 'get',
            //         headers: headers,
            //         credentails: 'include',
            //         mode: 'cors',
            //       })
            //     ])
            //       .then(kres => Promise.all([kres[0], kres[1].blob()]))
            //       .then(kblob => {
            //         return { [kblob[0]]: kblob[1] }
            //       })
            //     ))
            //     .then(imgBlobs => Object.assign(...imgBlobs)).then(imgObj => {
            //       this.setState({ medicsImages: imgObj });
            //     })
            // .then(allProm => {console.log(allProm);});

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
      <MedicContainer medicsInfo={this.state.medicsInfo} medicsImages={this.state.medicsImages}/>
    </div>
  );
};
}

export default AuthenticationForm;
