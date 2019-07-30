import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios';

import MuiLink from '@material-ui/core/Link';
const styles = theme => ({
    rightGivesTop:{
        position: 'fixed',
        top:'5px',
        // width:'100%',
        width: '300px',
        margin:'auto',
        whiteSpace: 'normal !important'
    },
    rightGives:{
        width:'100%',
        margin:'auto',
        // borderBottom: '1px solid #EDEDED',
    },
    itemH2:{
        margin:'0px 0px !important',
        fontWeight: 'bold',
        fontWeight: '600',
    },
    itemP:{
        marginTop: '0px !important',
        marginBottom: '0px !important',
        fontSize: '13px !important',
        color: '#818181 !important;',
        lineHeight: '23px !important',
        fontWeight: '400',
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
    givesItem:{
        marginTop:'10px',
        padding: '10px 0px',
        [theme.breakpoints.down('sm')]: {
          padding: '0em 1em',
        },
    },
    toolbarLink: {
        fontSize: '0.875rem !important',
        whiteSpace: 'normal !important',
        textDecoration:'none !important'
    },

});



class RightGivesTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isTop: false };
        this.windowOnScroll = this.windowOnScroll.bind(this);
    }


    componentDidMount() {
        window.addEventListener("scroll", this.windowOnScroll);
        // this.setState({ offset: this.props.offset });
        // console.log('this.props.collectionList',this.props.CollectionList);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.windowOnScroll);
    }

    windowOnScroll() {
        const h = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log('h:', typeof h,h);
        if(h >= 700){
            // console.log('变更css！');
            this.setState({isTop:true});
        }else{
            // console.log('不变！');
            this.setState({isTop:false});
        }
    };

    render() {
        const { classes,CollectionList } = this.props;
        const { isTop } = this.state;
        return (
            <Grid className={isTop?classes.rightGivesTop:classes.rightGives} >
                <Typography component="h3" className={classes.itemH2} >
                    推荐文档
                </Typography>
                    {CollectionList.map(({id,name,introduction,created_at }, index) => (
                        <MuiLink
                            color="inherit"
                            noWrap
                            key={index}
                            href={`/collection/${id}`}
                            variant="body2"
                            className={classes.toolbarLink}
                        >
                            <Grid className={classes.givesItem}>
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
            </Grid>
        )
    }
}

RightGivesTop.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightGivesTop);
