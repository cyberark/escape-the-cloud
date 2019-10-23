import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const H6 = withStyles({
	root: {
		fontFamily: 'Roboto',
		fontSize: 20,
		fontWeight: 100,
		color: '#1d1d1d',
		marginBottom: 30
	}
})(Typography)

export default H6
