import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
require('../fonts/Kingthings_Printingkit-webfont.css')

// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.

const StyledInput = withStyles({
	root: {
		alignItems: 'flex-end',
		color: '#000000',
		fontSize: 18
	}
})(Input)

export default StyledInput
