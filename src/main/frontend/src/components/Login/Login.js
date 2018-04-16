import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { passwordHash } from "password-hash";
import $ from 'jquery'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import * as types from '../../constants/types'
import './styles.css'
import { HeaderBar } from '../'

export default class Login extends Component {
  state = {
    userId: 0,
    wrongPassword: false
  }

  static propTypes = {
    userId: number
  }

  constructor(props) {
    super(props);

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  setActive = (that, option) => {
    switch (option) {
      case types.LOGIN:
          that.refs.loginLink.className = "active";
          that.refs.registerLink.className = "";
          that.refs.loginForm.style.display = "block";
          that.refs.registerForm.style.display = "none";
          break;
      case types.REGISTER:
          that.refs.loginLink.className = "";
          that.refs.registerLink.className = "active";
          that.refs.loginForm.style.display = "none";
          that.refs.registerForm.style.display = "block";
          break;
      default:
          that.refs.loginLink.className = "active";
          that.refs.registerLink.className = "";
          that.refs.loginForm.style.display = "block";
          that.refs.registerForm.style.display = "none";
    }
  }

  componentWillMount = () => {
        this.setState({ userId: this.props.userId });
  }

  handleLoginSubmit = (e) => {
    var dataToSend = {
      name: this.state.name,
      password: this.state.password
    }
    var passwordHash = require('password-hash');

    $.post( "/travel/login", dataToSend, ( data ) => {
      if (data === "Blocked") {
        alert("The user is blocked!");
      } else if (passwordHash.verify(this.state.password, data)) {
        this.props.history.push("/home");
      } else {
        this.setState({wrongPassword: true});
        this.logOffUser();
      }
    });
    e.preventDefault();
  }

  handleRegisterSubmit = (e) => {
    $.post( "/travel/register", this.state, ( data ) => {
      data === true ? this.props.history.push("/home") : alert("Error!")
    });
    e.preventDefault();
  }

  logOffUser = (e) => {
    $.post( "/travel/logoff", this.state);
  }

  getLogInOutput = () => {
    var passwordHash = require('password-hash');
    var output = <div>
    <HeaderBar userId={this.props.userId}/>
    <div className="login-window">
    <div className="container">
      <div className="col-md-6 col-md-offset-3 login-window">
        <div className="panel panel-login">
          <div className="panel-heading">
            <a className="active" ref="loginLink" onClick={() => this.setActive(this, types.LOGIN)}>Login</a>
            <a ref="registerLink" onClick={() => this.setActive(this, types.REGISTER)}>Register</a>
            <hr/>
          </div>

          <div className="panel-body">
            <div className="col-lg-12">
              <form ref="loginForm" className="login-form" role="form"  onSubmit={this.handleLoginSubmit}>
                <div className="form-group">
                  <input type="text" name="username" tabIndex="1" className="form-control" placeholder="Username"
                    onChange={(e) => this.setState({ name: e.target.value })} required/>
                </div>
                <div className="form-group">
                  <input type="password" name="password" tabIndex="2" className="form-control" placeholder="Password"
                    onChange={(e) => this.setState({ password: e.target.value })} required/>
                </div>
                {this.state.wrongPassword === true ? <p> Wrong username or password! </p> : (null)}
                <div className="form-group">
                  <input type="submit" name="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In"/>
                </div>
              </form>

              <form ref="registerForm" className="register-form" role="form" onSubmit={this.handleRegisterSubmit}>
                <div className="form-group">
                  <input type="text" name="username" tabIndex="1" className="form-control" placeholder="Username"
                    onChange={(e) => this.setState({ name: e.target.value })} required/>
                </div>
                <div className="form-group">
                  <input type="email" name="email" tabIndex="1" className="form-control" placeholder="Email Address"
                    onChange={(e) => this.setState({ email: e.target.value })} required/>
                </div>
                <div className="form-group">
                  <input type="password" name="password" tabIndex="2" className="form-control" placeholder="Password"
                    onChange={(e) => this.setState({ password: passwordHash.generate(e.target.value) })} required/>
                </div>
                <div className="form-group">
                  <input type="password" name="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" required/>
                </div>
                <div className="form-group">
                  <input type="submit" name="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>

    return output;
  }

  getLogOffOutput = () => {
    var output =
      <div>
        <HeaderBar userId={this.setState.userId}/>
        <h4 className="logoff"> Logged off </h4>
        <input type="submit" className="logoff-button" value="Log In"  onClick={() => this.setState({userId: 0})}/>
      </div>

    return output;
  }

  render() {
    if (this.state.userId !== 0) {
      this.logOffUser();
    }

    return (
      <div>
        {this.state.userId === 0 ? this.getLogInOutput() : this.getLogOffOutput()}
      </div>
    )
  }
}
