import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link'
import MuiLink from '@material-ui/core/Link';
const MoreData = dynamic(() => import('../components/MoreData'), { ssr: false });
const RightGivesTop = dynamic(() => import('../components/RightGivesTop'), { ssr: false });
import CollectionImageList from '../components/CollectionImageList'

const styles = theme => ({
  contentLayout: {
    flex: 1,
    display:'flex',
    // marginTop:'20px',
    padding:'0px 60px',
    [theme.breakpoints.down('sm')]: {
      padding:'0px 5px',
    },
  },

  leftArticle:{
    marginTop:'20px',
    width:'100%',
    margin:'auto',
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      margin: 'auto',
      padding: '0em 0em',
    },
  },
  rightGives:{
    marginTop:'10px',
    padding: '0px 100px',
    borderBottom: '1px solid #EDEDED',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    },
  },
  item:{
    marginTop:'10px',
    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '0em 1em',
    },
 },
  itemH2:{
    fontWeight: 'bold',
    fontWeight: '600',
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
  collectionHeader:{
    height:'auto',
    // backgroundColor:'coral'
  },
  collectionInfo:{
    flex: 1,
    display:'flex',
    color: '#ffffff !important',
    width: '100%',
    margin: 'auto',
    padding: '1em 2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0em 1em',
    },
  },
  collectionImg: {
    margin: '20px auto',
    width: 80,
    height: 80,
    backgroundColor:'#000000',
  },
  imgItem:{
    "width": "100%",
    "height": "250px",
    "overflow": "hidden",
    marginTop: '10px !important',
    marginBottom: '10px !important',
  },
  toolbarLink:{
    whiteSpace:'normal !important',
    flex:1,
    display:'flex'
  },
  imgItem:{
    "width": "100px !important",
    "height": "100px",
    "overflow": "hidden",
    margin:'0px auto',
    // marginTop: '10px !important',
    // marginBottom: '10px !important',
  },

});

class Collection extends React.Component {

  static async getInitialProps(context) {
    const { id } = context.query;
    const resCollection = await fetch(`http://127.0.0.1:8000/api/collection/?type=2&limit=20`);
    const collectionList = await resCollection.json();
    return {
          collectionList:collectionList.results,
     };
  }

  render() {
    const { classes, collectionList} = this.props;

    return (
      <Layout  getUrl='doc' >

        <div className={classes.contentLayout} >
            <Grid item xs={false} sm={12} md={7} className={classes.leftArticle} >
             {collectionList.map(({id,name,introduction,created_at }, index) => (
                   <MuiLink
                        color="inherit"
                        noWrap
                        key={index}
                        href={`/doc/${id}`}
                        variant="body2"
                        className={classes.toolbarLink}
                    >
                     <Grid  item xs={false} sm={3} md={3} className={classes.item} >
                         <Grid className={classes.imgItem}>
                            <img
                              src={`https://static001.geekbang.org/resource/image/11/eb/11af840c6cd82cfb358a6eb9126347eb.jpg?x-oss-process=image/resize,m_fill,h_336,w_254`}
                              style={{
                                width: '100%',
                                objectFit: 'scale-down'
                              }}
                            />
                        </Grid>

                     </Grid>

                        <Grid item xs={false} sm={9} md={9} className={classes.item}>
                            <Typography component="h2" className={classes.itemH2} >
                                {name}
                            </Typography>
                            <Typography component="p" className={classes.itemP}  >
                                {introduction}
                            </Typography>
                        </Grid>
                     </MuiLink>
                )
              )}
                {/* <MoreData
                  url={`http://127.0.0.1:8000/api/articlessr/?`}
                  count={count}
                  offset={offset}
                /> */}
            </Grid>
            {/* <Grid item xs={false} sm={12} md={5} className={classes.rightGives} >
                  <RightGivesTop  CollectionList={collectionList} />
            </Grid> */}

        </div>
        <style jsx global>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans CN", sans-serif;
          }
          h3 {
            margin: 20px 0 !important;
            font-size: 21px !important;
            font-weight: 500 !important;
            line-height: 40px !important;
            color: coral;
          }
          img {
            width: 100%;
            margin: auto
          }
        `}</style>
      </Layout>
    )
  }
}

Collection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Collection);
// export default Post