import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { YellowButton, BlackButton } from '../components'
import styles from '../styles'
import { H1, H6 } from '../components'

class Task extends Component {
	constructor() {
		super()
		this.state = {
			secretValue: null
		}
	}

	openTask(userId, taskNumber, taskLink) {
		const { updateTaskStartTime } = this.props
		updateTaskStartTime(userId, taskNumber)
		window.open(taskLink)
	}

	render() {
		const {
			classes,
			userId,
			taskStatus,
			taskLink,
			push,
			checkSecret
		} = this.props
		const { taskNumber, taskDescription, taskService } = this.props.element

		return (
			<div className={classes.heroUnit}>
				<div className={classes.heroContent}>
					<H1 component='h1' variant='h2'>
						Challenge {taskNumber}: {taskService}
					</H1>
					<H6 variant='h6' paragraph>
						{taskDescription}
					</H6>
					<div className={classes.heroButtons}>
						<YellowButton
							onClick={() => this.openTask(userId, taskNumber, taskLink)}>
							GO TO {taskService}
						</YellowButton>
					</div>
					<div className={classes.heroButtons} style={{ display: 'flex' }}>
						<Input
							placeholder='Enter the secret'
							className={classes.input}
							style={{
								alignItems: 'flex-end',
								color: '#000000',
								fontSize: 18
							}}
							inputProps={{
								'aria-label': 'Description'
							}}
							onChange={change =>
								this.setState({
									secretValue: change.target.value
								})
							}
						/>
						<BlackButton
							style={{ marginLeft: 30 }}
							onClick={() =>
								checkSecret(userId, taskNumber, this.state.secretValue)
							}>
							VERIFY SECRET
						</BlackButton>
					</div>
					<div className={classes.heroButtons}>
						<Typography variant='h6' color='textPrimary' gutterBottom>
							Challenge {taskNumber} status:{' '}
							{taskStatus === true ? 'Done' : 'Incomplete'}
						</Typography>
						<br />
						<br />
						{this.props.taskStatus === true ? (
							<YellowButton
								onClick={() =>
									taskNumber === 4
										? push('/finish')
										: push('/task' + (taskNumber + 1))
								}>
								NEXT CHALLENGE >>
							</YellowButton>
						) : (
							<div />
						)}
					</div>
				</div>
			</div>
		)
	}
}

Task.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Task)
