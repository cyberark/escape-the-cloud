import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signIn, authAction } from '../actions/index'
import { H1, H6, BlackButton, StyledInput } from '../components'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'

class SignIn extends Component {
	constructor(props) {
		super(props)
		this.submitElement = React.createRef()
	}

	handleKeyDown = event => {
		if (event.key === 'Enter') {
			this.submitElement.current.props.onClick()
		}
	}
	handleSignIn = event => {
		if (event) {
			event.preventDefault()
		}
		const { username, password } = this.props.inputs
		this.props.signIn(username, password)
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.heroUnit}>
				<div className={classes.heroContent}>
					<H1 component='h1' variant='h2'>
						WELCOME, COMRADE!
					</H1>
					<H6 variant='h6' paragraph>
						During the missions, you visit the most anticipated AWS Services,
						entering the most dangerous places on the cloud, trying to prevent
						the enemy secret intelligence from decrypting and discovering sensitive
						information about our homeland, while staying under the radar. Are you
						ready to start? if so, press the Start button.
					</H6>
					<H1 component='h1' variant='h2'>
						LOGIN
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
							<BlackButton
								style={{ marginLeft: 30 }}
								onClick={this.handleSignIn}
								ref={this.submitElement}>
								GO!
							</BlackButton>
						</div>
					</form>
					<div style={{ display: 'flex', marginTop: 35 }}>
						<H6 variant='h6'>Don't have an account?</H6>
						<H6
							variant='h6'
							style={{
								marginLeft: 10,
								fontWeight: 'bold',
								cursor: 'pointer'
							}}
							onClick={() => this.props.authAction('SignUp')}>
							Sign Up
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
		signIn: (username, password) => dispatch(signIn(username, password)),
		authAction: task => dispatch(authAction(task))
	}
}

SignIn.propTypes = {
	classes: PropTypes.object.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SignIn))
