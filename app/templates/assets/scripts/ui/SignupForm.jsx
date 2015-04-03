var React = require('react');

var SignupForm = React.createClass({
  getInitialState: function() {
    return {errors: null};
  },
  getDefaultProps: function(){
    return {submitUrl:'signup'};
  },
  _handleSubmit:function(e){
  },
  _handlePswChange:function(e){
    this.setState({psw:e.target.value});
  },
  _handlePswConfChange:function(e){
    if( e.target.value !== this.state.psw )
    {
      this.setState({errors:'"Password" and "Password confirmation" must be the same.'});
    }
  },
  render: function() {
    return (
        <form onSubmit={this._handleSubmit()}>
            { !this.state.errors ? '': 
              <div className="error-container"><p className="alert alert-danger">{this.state.errors}</p></div>
            }
            <div className="form-group">
                <input type="text" name="first_name" className="form-control first" placeholder="First name"/>
            </div>
            <div className="form-group">
                <input type="text" name="last_name" className="form-control" placeholder="Last name"/>
            </div>
            <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Email" required/>
            </div>
            <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="Password" onChange={this._handlePswChange} required/>
            </div>
            <div className="form-group">
                <input type="password" name="password_confirm" className="form-control last" placeholder="Password confirmation" onBlur={this._handlePswConfChange}/>
            </div>
            <button className="btn btn-info btn-block" type="submit">Signup</button>
        </form>
    );
  }
});


module.exports = SignupForm;