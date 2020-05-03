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
  username: {
    display: 'flex',
    alignItems: 'center',

    '& p': {
      marginRight: '.5rem',
    },
  },
  menuIcon: {
    marginLeft: '.5rem',
  },
  authButton: {
    color: '#eee',
    paddingTop: '10px',
    margin: '0 5px',
  },
  activeNavLink: {
    borderBottom: '2px solid #FF5722',
  },
}))

export default styles
