import {createMuiTheme} from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DC143C' //crimson
    },
    secondary: {
      main: '#ADD8E6'
    },
    white: 'white',
    black: 'black',
    red: 'red'
  },
  status: {},
  overrides: {}
})

export default Theme