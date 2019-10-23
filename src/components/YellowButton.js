import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
require('../fonts/Kingthings_Printingkit-webfont.css')

// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.

const YellowButton = withStyles({
	root: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 14,
		boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.5)',
		border: 'solid 2px #1d1d1d',
		backgroundColor: '#ffba00',
		fontFamily: 'KinggsPrintingkit',
		fontSize: 24,
		fontWeight: 100,
		color: '#000000',
		'&:hover': {
			border: 'solid 2px #1d1d1d',
			backgroundColor: '#ffffff'
		}
	},
	label: {
		textTransform: 'capitalize'
	}
})(Button)

export default YellowButton
