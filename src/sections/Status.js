import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { getAllData } from '../actions/index'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'
import { H1, SPAN } from '../components'
import { Object } from 'core-js';

function buildScoreForTask(taskNumber, startTime, endTime) {
	if (endTime !== 0) {
		var taskScore = (1 / (endTime - startTime)) * taskNumber;
		return taskScore;
	}
	return 0;
}

class Status extends Component {

	// componentDidMount() {
	// 	setInterval(() => { this.props.getAllData() }, 10000);
	// 	this.props.getAllData();
	// }

	render() {
		const { classes, data } = this.props
		var scores = [];

		if (data) {

			Object.keys(data).map((key) => {
				var userData = data[key];
				var userScore = 0;
				Object.keys(userData).map((task) => {
					if (task !== "userId") {
						userScore = userScore + buildScoreForTask(parseInt(task.substr(task.length - 1)), parseInt(userData[task].StartTimeStamp) / 1000, parseInt(userData[task].EndTimeStamp) / 1000);
					}
				});
				
				if (userScore !== 0) {
					userScore = parseInt(userScore * 1000);
					scores.push({
						userId: userData.userId,
						userScore
					});	
				}
			});	

			scores.sort((a, b) => a.userScore - b.userScore);
		}

		return (
			<div className={classes.heroUnit}>
				<div className={classes.heroContent}>
					<H1 align='center'>Latest Scores:</H1><br/>
					<table>
						{scores.map((score) => {
						  return <tr><td><SPAN>{score.userId}</SPAN></td><td><SPAN>{score.userScore}</SPAN></td></tr>
						})}
					</table>
				</div>
			</div>
		)
	}
}

Status.propTypes = {
	classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		data: state.rootReducer.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// getAllData: () => dispatch(getAllData())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Status))
