import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    width: '8.5rem',
    height: '8.5rem',
    margin: 'auto',
    backgroundColor: theme.palette.secondary.light,
    fontSize: '5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      width: '5rem',
      height: '5rem',
    },
  },
  hovered: {
    filter: 'opacity(25%)',
  },
  icon: {
    position: 'absolute',
    top: 'calc(50% - 17.5px)',
    left: 'calc(50% - 17.5px)',
  },
  dialog: {
    padding: '1rem',
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem',
    },
  },
  preview: {
    width: 150,
    marginBottom: '1rem',
  },
}))

export default useStyles
