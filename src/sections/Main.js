import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authenticate } from '../actions/index'

import { CssBaseline } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Route, Switch } from 'react-router'
import { push } from 'connected-react-router'

import {
	Task,
	Welcome,
	Finish,
	Smart,
	Header,
	Footer,
	Authentication,
	Status
} from '../sections'
import {
	checkTasksStatus,
	checkSecret,
	updateTaskStartTime
} from '../actions/index'

import elements from '../misc/elements'
import styles from '../styles/index'

class Main extends Component {
	componentDidMount() {
		const { authenticate } = this.props
		authenticate()
	}

	componentDidUpdate(prevProps) {
		const { checkTasksStatus, user, push } = this.props
		if (user !== prevProps.user && user.authState === true) {
			checkTasksStatus(user.userId)
		}
		if (user !== prevProps.user && user.authState === false) {
			push('/')
		}
	}

	render() {
		const {
			classes,
			user,
			updateTaskStartTime,
			checkSecret,
			tasks,
			history,
			push
		} = this.props
		return (
			<Fragment>
				<CssBaseline />
				<Header classes={classes} push={push} />
				<main className={classes.main}>
					<Switch>
						<Route
							key={0}
							exact
							path='/'
							component={() =>
								user && user.authState ? (
									<Welcome history={history} push={push} tasks={tasks} />
								) : (
									<Authentication />
								)
							}
						/>
						} />
						{elements.map(element => {
							if (
								element.taskNumber !== 1 &&
								!tasks['Task' + (element.taskNumber - 1)].Done
							) {
								return (
									<Route
										key={element.taskNumber}
										path={'/task' + element.taskNumber}
										component={() => <Smart history={history} />}
									/>
								)
							}
							return (
								<Route
									key={element.taskNumber}
									path={'/task' + element.taskNumber}
									component={() => (
										<Task
											key={element.taskNumber}
											element={element}
											userId={user.userId}
											taskStatus={tasks['Task' + element.taskNumber].Done}
											taskLink={tasks['Task' + element.taskNumber].Link}
											checkSecret={checkSecret}
											updateTaskStartTime={updateTaskStartTime}
											history={history}
											push={push}
										/>
									)}
								/>
							)
						})}
						<Route
							key={5}
							exact
							path='/finish'
							component={() => <Finish history={history} />}
						/>
						<Route
							key={6}
							exact
							path='/status'
							component={() => <Status history={history} />}
						/>
					</Switch>
				</main>
				<Footer classes={classes} />
				<ToastContainer autoClose={5000} />
			</Fragment>
		)
	}
}

Main.propTypes = {
	classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		user: state.rootReducer.user,
		tasks: state.rootReducer.tasks
	}
}

function mapDispatchToProps(dispatch) {
	return {
		authenticate: () => dispatch(authenticate()),
		checkTasksStatus: userId => dispatch(checkTasksStatus(userId)),
		checkSecret: (userId, taskNumber, secret) =>
			dispatch(checkSecret(userId, taskNumber, secret)),
		updateTaskStartTime: (userId, taskNumber) =>
			dispatch(updateTaskStartTime(userId, taskNumber)),
		push: path => dispatch(push(path))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Main))
