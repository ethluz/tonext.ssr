import Layout from '../../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';
const LeftListTRee = dynamic(() => import('../../components/LeftListTRee'), { ssr: false });
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link'
import MuiLink from '@material-ui/core/Link';
const MoreData = dynamic(() => import('../../components/MoreData'), { ssr: false });

const styles = theme => ({
  contentLayout: {
    flex: 1,
    display:'flex',
    marginTop:'20px'
  },
  toolbarTitle: {
    flex: 1,
  },
  contentHtml:{
    width:'90%',
    margin:'auto'
  },
  leftCon:{
    position: 'fixed',
    // padding: '0 2em 4em 2em',
    width: '30%',
    height:'80vh',
    overflow: 'auto',
    borderRight: '2px solid coral',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    },
  },
  rightArticle:{
    float: 'left',
    width: '60%',
    marginLeft: '30%',
    padding: '2em 2em',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      margin: 'auto',
      padding: '0em 0em',
    },
  },
  centerArticle:{
    width: '100%',
    margin: 'auto',
    padding: '2em 2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0em 0em',
    },
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
    // color:'coral',
    fontWeight: '600',
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
    height:'200px',
    backgroundColor:'coral'
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
    textDecoration:'none !important'
  }

});

class Post extends React.Component {
  static async getInitialProps(context) {
    const { id } = context.query;
    const limit = 3;
    const resArticle = await fetch(`https://api.xuexi.one/api/articlessr/?collection=${id}&limit=${limit}`);
    const resCollection= await fetch(`https://api.xuexi.one/api/collection/${id}`);
    const ArticleList = await resArticle.json();
    const collection = await resCollection.json();
    console.log(`Fetched show`, ArticleList);
    return {
          id:id,
          offset:limit, //起点序号
          list:ArticleList.results,
          collection:collection,
          count:ArticleList.count
     };
  }

  render() {
    const { classes,list,count, offset,id} = this.props;

    return (
      <Layout getUrl='doc'  >
         <Grid className={classes.collectionHeader} >
              <Grid item xs={false} sm={12} md={7}  className={classes.collectionInfo} >
              <Grid item xs={false} sm={9} md={9}  >
                      <h1
                      style={{
                        borderBottom: '2px solid #ffffff',
                        padding: '0px 0px 0px 0px',
                        display: 'inline-block'
                      }}
                      >
                          {this.props.collection.name}
                      </h1>
                      <p>  {this.props.collection.introduction}</p>
              </Grid>
              <Grid item xs={false} sm={3} md={3}   >
                      <Avatar className={classes.collectionImg}>每周</Avatar>
              </Grid>
              </Grid>
        </Grid>
        <div className={classes.contentLayout} >
            <Grid item xs={false} sm={12} md={7} className={classes.centerArticle} >
              {list.map(({id,new_title,new_description,bg_imgurl }, index) => (

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
                // </Link>
              )
              )}

                <MoreData
                  url={`https://api.xuexi.one/api/articlessr/?collection=${id}`}
                  count={count}
                  offset={offset}
                  // settingOffset={this.settingOffset}
                />
            </Grid>

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


Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
// export default Post