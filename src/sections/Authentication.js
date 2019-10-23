import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SignIn, Verify, SignUp } from '../sections'

class Authentication extends Component {
	// Handle changes to form inputs on sign-up, verification and sign-in
	handleFormInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		const { user, authAction } = this.props
		if (user && user.message === 'User is not confirmed.') {
			return (
				<Verify handleFormInput={this.handleFormInput} inputs={this.state} />
			)
		}
		if (user && user.message === 'Invalid verification code provided, please try again.') {
			return (
				<Verify handleFormInput={this.handleFormInput} inputs={this.state} />
			)
		}
		if (authAction === 'SignUp') {
			return (
				<SignUp handleFormInput={this.handleFormInput} inputs={this.state} />
			)
		} else if (authAction === 'SignIn') {
			return (
				<SignIn handleFormInput={this.handleFormInput} inputs={this.state} />
			)
		}
	}
}

const mapStateToProps = state => {
	return {
		user: state.rootReducer.user,
		authAction: state.rootReducer.authAction
	}
}

export default connect(mapStateToProps)(Authentication)
