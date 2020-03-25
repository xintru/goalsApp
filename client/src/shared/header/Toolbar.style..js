import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles({
  root: {
    position: 'relative',
    flexGrow: 1,
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
    paddingTop: '10px',
    margin: '0 5px',
  },
  activeNavLink: {
    borderBottom: '2px solid white',
  },
})

export default styles
