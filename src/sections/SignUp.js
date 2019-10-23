import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signUp, authAction } from '../actions/index'
import { H1, H6, BlackButton, StyledInput } from '../components'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'

class SignUp extends Component {
	constructor(props) {
		super(props)
		this.submitElement = React.createRef()
	}

	handleKeyDown = event => {
		if (event.key === 'Enter') {
			this.submitElement.current.props.onClick()
		}
	}
	handleSignUp = event => {
		if (event) {
			event.preventDefault()
		}
		const { username, email, password } = this.props.inputs
		this.props.signUp(username, email, password)
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.heroUnit}>
				<div className={classes.heroContent}>
					<H1 component='h1' variant='h2'>
						HELLO, CANDIDATE!
					</H1>
					<H6 variant='h6' paragraph>
						Some serious security incident occured in our offices, and now we
						need you to recover. We managed to keep a backdoor to an AWS account
						open, and that’s excatly how you're gonna take'm down.
						<br />
						Entering this room requires basic understanding of AWS security
						features. Are you ready for the challenge?
					</H6>
					<H1 component='h1' variant='h2'>
						SIGN UP
					</H1>
					<form className='authentication__form' style={{ display: 'flex' }}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<StyledInput
								type='text'
								name='username'
								value={this.props.username}
								placeholder='Username'
								className={classes.input}
								inputProps={{
									'aria-label': 'Username'
								}}
								onChange={this.props.handleFormInput}
								onKeyDown={this.handleKeyDown}
							/>
							<StyledInput
								type='text'
								name='email'
								value={this.props.email}
								placeholder='Email'
								className={classes.input}
								inputProps={{
									'aria-label': 'Email'
								}}
								style={{ marginTop: 15 }}
								onChange={this.props.handleFormInput}
								onKeyDown={this.handleKeyDown}
							/>
							<StyledInput
								type='password'
								name='password'
								value={this.props.password}
								placeholder='Password'
								className={classes.input}
								inputProps={{
									'aria-label': 'Password'
								}}
								style={{ marginTop: 15 }}
								onChange={this.props.handleFormInput}
								onKeyDown={this.handleKeyDown}
							/>
						</div>
						<div style={{ marginLeft: 30, alignSelf: 'center' }}>
							<BlackButton ref={this.submitElement} onClick={this.handleSignUp}>
								GO!
							</BlackButton>
						</div>
					</form>
					<div style={{ display: 'flex', marginTop: 35 }}>
						<H6 variant='h6'>Already have an account?</H6>
						<H6
							variant='h6'
							style={{
								marginLeft: 10,
								fontWeight: 'bold',
								cursor: 'pointer'
							}}
							onClick={() => this.props.authAction('SignIn')}>
							Log In
						</H6>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.rootReducer.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signUp: (username, password, email) =>
			dispatch(signUp(username, password, email)),
		authAction: task => dispatch(authAction(task))
	}
}

SignUp.propTypes = {
	classes: PropTypes.object.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SignUp))
