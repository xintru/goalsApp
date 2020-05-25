import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.textColor,
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingTop: '6rem',
  },
  infoContainer: {
    paddingBottom: 30,
  },
  title: {
    paddingBottom: '1rem',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  description: {
    fontWeight: 400,
    marginBottom: '1rem'
  }
}))

export default useStyles
