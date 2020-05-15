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
}))

export default useStyles
