import Layout from '../../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';
const LeftListTRee = dynamic(() => import('../../components/LeftListTRee'), { ssr: false });

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
  }

});

class Post extends React.Component {
  static async getInitialProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://127.0.0.1:8000/api/articlessr/${id}`);
    const show = await res.json();
    console.log(`Fetched show: ${show.title}`);
    return { show };
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout >
        <div className={classes.contentLayout}>
            {
              this.props.show.order_num
                &&
               <Grid item xs={false} sm={1} md={3}  className={classes.leftCon} >
                <LeftListTRee  collection={this.props.show.collection}  id={this.props.show.id} />
              </Grid>
            }

            <Grid item xs={false} sm={12} md={7} className={this.props.show.order_num? classes.rightArticle:classes.centerArticle} >
                <h1>{this.props.show.new_title}</h1>
                <div  className={classes.contentHtml}  dangerouslySetInnerHTML={{__html: this.props.show.content}} />
            </Grid>
        </div>
        <style jsx global>{`
          body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans CN", sans-serif;
          }
          h1 {
            width:90%;
            margin:20px auto;
            text-align: center;
          }
          h2 {
            font-size: 26px !important;
            padding-bottom: 15px;
            margin: 35px 0 20px !important;
            color: coral;
            line-height: 40px !important;
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

          a {
            color: #111;
            font-size: 16px !important;
            font-weight: bold;
          }
          p {
            margin-bottom: 0px;
            font-size: 16px;
            color: #2D2D2F;
            line-height: 28px;
            margin-bottom: 28px;
          }
          ol {
            padding-left: 2em;
          }
          li {
            margin-bottom: 0px;
            font-size: 16px;
            color: #2D2D2F;
            line-height: 28px;

          }
          blockquote {
            margin: 0px;

          }
          blockquote  p {
            // color: coral !important;
            font-weight: bold;
            font-weight: bolder;
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