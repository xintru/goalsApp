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
    paddingBottom: '1.5rem',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  btn: {
    marginTop: '5rem',
    width: '15rem',
    height: '3.5rem',
    fontSize: '1rem',
  },
}))

export default useStyles
