import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}))

export default useStyles
