import React from 'react';


import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    color:'coral'
  },
  toolbarLink:{
    fontSize: '0.875rem !important',
    whiteSpace:'normal !important'
  },
  collectionItem:{
    marginTop:'20px',
    padding: '10px 0px',
    borderBottom: '1px solid #EDEDED',
    [theme.breakpoints.down('sm')]: {
      padding: '0em 1em',
      borderBottom: '0px solid #EDEDED',
    },
  },
  itemH2:{
    fontWeight: 'bold',
    // color:'coral'
  },
  itemP:{

    marginTop: '10px !important',
    marginBottom: '10px !important',
    color: '#818181 !important',
    lineHeight: '23px !important',
    fontSize: '13px !important',
    fontWeight: '400',
  },
  progress:{
      margin:'30px auto',
  },
  imgItem:{
    "width": "100%",
    "height": "250px",
    "overflow": "hidden",
    marginTop: '10px !important',
    marginBottom: '10px !important',
  },
  toolbarLink:{
    whiteSpace:'normal !important'
  }
});

class MoreData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {moredata: [],offset:null,hasNext:true};
    this.handleScroll = this.handleScroll.bind(this);
  }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.setState({offset:this.props.offset});
   }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if(this.state.hasNext) {
                this.getmoData();
            }

        } else {
            // this.setState({offset:docHeight});

        }
    }

    async getmoData() {
        console.log('props.url', this.props.url);
        console.log('props.limit', this.state.offset);
        console.log('props.count', this.props.count);
        console.log('到达了底部');
        let { moredata,offset } = this.state;
        // const resArticle = await fetch(`http://127.0.0.1:8000/api/collectionwitharticle/?collection=${id}&limit=${limit}`);
        const { data } = await axios.get(`${this.props.url}&&limit=3&offset=${this.state.offset}`);
        console.log(data);
        moredata = moredata.concat(data.results);
        offset = offset +3;
        this.setState({
            moredata,
            hasNext:data.next?true:false,
            offset
        })
    }
  render() {
    const { classes} = this.props;
    const { moredata } = this.state;
    return (
      <div   >
            <Grid className={classes.collectionItem}>
                <Typography  component="h2"  className={classes.itemH2} >
                    通告 | 每周以太坊，更多
                </Typography>
                <Typography component="p" className={classes.itemP}  >
                新鲜出炉：阶段 0 的技术详述已冻结！现在各客户端可以全速前进开发实现了
                </Typography>
            </Grid>

            {moredata.map(({id,new_title,new_description,bg_imgurl }, index) => (
                <MuiLink
                color="inherit"
                noWrap
                key={index}
                variant="body2"
                href={`/p/${id}`}
                className={classes.toolbarLink}
                >
                <Grid  className={classes.collectionItem}>
                <Typography  component="h2"  className={classes.itemH2} >
                    {new_title}
                </Typography>
                <Typography component="p" className={classes.itemP}  >
                    {new_description}
                </Typography>
                <Paper className={classes.imgItem}>
                        <img
                        src={bg_imgurl}
                        style={{
                            width: '100%',
                            objectFit: 'scale-down'
                        }}
                        />
                    </Paper>
                </Grid>
                </MuiLink>

                )
                )}
            <div style={{width:'100%', textAlign:'center'}}>
                <CircularProgress className={classes.progress} color="primary" />
            </div>

      </div>
    )
  }
}

MoreData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreData);
