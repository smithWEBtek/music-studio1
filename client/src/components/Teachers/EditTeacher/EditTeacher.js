import React, { Component } from 'react';
import classes from './EditTeacher.css';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';

class EditTeacher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      email: ''
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email
    })
  }

  handleOnChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('[EditTeacher][handleSubmit] this.state', this.state)
    let data = this.state;
    this.props.updateTeacher(data)
  }

  render() {
    return (
      <div>
        <p className={classes.FormInstructions}>Edit form and click 'Update Teacher'</p>
        <form onSubmit={this.handleSubmit} className={classes.Form}>
          <p><label htmlFor="student_name">First name </label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={(event) => this.handleOnChange(event)}
            /></p>
          <p><label>Last name </label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={(event) => this.handleOnChange(event)}
            /></p>
          <p><label>Email </label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleOnChange(event)}
            /></p>
          <button
            type="button"
            onClick={this.props.close}
            className={classes.Danger}
          >CANCEL</button>
          <button className={classes.Success}
          >SAVE</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTeacher: (data) => dispatch(actionCreators.updateTeacher, (data))
  }
}

export default connect(null, mapDispatchToProps)(EditTeacher);
