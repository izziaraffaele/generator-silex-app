var React = require('react');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {errors: null};
  },
  getDefaultProps: function(){
    return {submitUrl:'login'};
  },
  _handleSubmit:function(e){
  },
  render: function() {
    return (
        <form onSubmit={this._handleSubmit()}>
            <div className="form-group">
                <input type="email" name="email" className="form-control first" placeholder="Email" required/>
            </div>
            <div className="form-group">
                <input type="password" name="password" className="form-control last" placeholder="Password" required/>
            </div>
            <button className="btn btn-info btn-block" type="submit">Login</button>
        </form>
    );
  }
});


module.exports = LoginForm;