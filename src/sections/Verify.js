import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { confirmSignUp } from '../actions/index'
import { H1, H6, BlackButton, StyledInput } from '../components'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'

class Verify extends Component {
	constructor(props) {
		super(props)
		this.submitElement = React.createRef()
	}

	handleKeyDown = event => {
		if (event.key === 'Enter') {
			this.submitElement.current.props.onClick()
		}
	}

	handleVerification = event => {
		if (event) {
			event.preventDefault()
		}
		const { code } = this.props.inputs
		const { userId } = this.props.user
		this.props.confirmSignUp(userId, code)
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
						open, and that’s excatly how you're gonna take'm down. Entering this
						room requires basic understanding of AWS security features. Are you
						ready for the challenge?
					</H6>
					<H1 component='h1' variant='h2'>
						VERIFY
					</H1>
					<form className='authentication__form' style={{ display: 'flex' }}>
						<StyledInput
							type='text'
							name='code'
							value={this.props.code}
							placeholder='Verification Code'
							className={classes.input}
							inputProps={{
								'aria-label': 'Verification Code'
							}}
							onChange={this.props.handleFormInput}
							onKeyDown={this.handleKeyDown}
						/>
						<div style={{ display: 'flex', marginTop: 35 }}>
							<BlackButton
								style={{ marginLeft: 30 }}
								onClick={this.handleVerification}
								ref={this.submitElement}>
								VERIFY
							</BlackButton>
						</div>
					</form>
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
		confirmSignUp: (username, code) => dispatch(confirmSignUp(username, code))
	}
}

Verify.propTypes = {
	classes: PropTypes.object.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Verify))
