
var React = window.React = require('react'),
    ReactMounter = require('./reactMounter.js'),
    LoginForm = require("./ui/LoginForm.jsx"),
    SignupForm = require("./ui/SignupForm.jsx");

var LoginPage = React.createClass({
  render:function(){
    return (
      <div className="login-container">
          <div className="avatar"/>
          <div className="form-box">
              <LoginForm />
          </div>
      </div>
    );
  }
});

ReactMounter.mount('login',LoginPage);

var SignupPage = React.createClass({
  render:function(){
    return (
      <div className="login-container">
          <div className="avatar"/>
          <div className="form-box">
              <SignupForm />
          </div>
      </div>
    );
  }
});
ReactMounter.mount('signup',SignupPage);

