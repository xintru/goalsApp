import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme) => ({
  root: {
    color: '#eee',
    position: 'relative',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.dark,
  },
  menuButton: {
    position: 'absolute',
  },
  title: {
    flexGrow: 1,
    marginLeft: '2.5rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',

    '& p': {
      marginRight: '.5rem',
    },
  },
  username: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuIcon: {
    marginLeft: '.5rem',
  },
  authButton: {
    color: '#eee',
    paddingTop: '20px',
    boxSizing: 'border-bottom',
    paddingBottom: 18,
    margin: '0 5px',
  },
  activeNavLink: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
}))

export default styles
