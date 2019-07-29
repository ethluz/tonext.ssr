// import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/SearchIcon';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// import Link from './Link'
import MuiLink from '@material-ui/core/Link';
const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `2px solid #FF7F50`,
      height:'50px',
      background:'#FF7F50',
      color:'#ffffff'
    },
    toolbarTitle: {
      // flex: 1,
      width: '80px',
      // color:'#ffffff'
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
}));

const sections = [
  '公链开发',
  '入门',
  '以太坊',
  'DiFi',
  '第一课',
  '波卡链',
  'cosmos',
  'web3',
  '投资者',
  '',
];

export default function Header() {
  const classes = useStyles();
  return (
    <div>
       <Toolbar className={classes.toolbar}>
          <Button size="small" styles={{color:'#ffffff'}}> logo</Button>
          {/* <div styles={{margin:'auto',width:'300px'}}> */}
          <Typography
            component="h3"
            variant="h3"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            首页
          </Typography>
          <Typography
            component="h3"
            // variant="h3"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            文档
          </Typography>
          <Typography
            component="h3"
            // variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            专题
          </Typography>

          <IconButton>

          </IconButton>
          {/* <Button variant="outlined" size="small">
            登陆
          </Button> */}
        </Toolbar>
        {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <MuiLink
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              href="/p/2"
              className={classes.toolbarLink}
            >
               {section}
            </MuiLink>
          ))}
        </Toolbar> */}
    </div>
  )
}
