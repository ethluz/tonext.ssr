import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from './Typography'

const styles = theme => ({
  root: {
    marginTop: 0,
    marginBottom: '0px',
  },
  images: {
    marginTop:  '20px', //theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 200,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function CollectionImageList(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80',
      title: '区块链快速入门',
      width: '40%',
    },
    {
      url:
        'https://substrate.dev/img/substrate-placeholder.png',
      title: 'substrate框架',
      width: '20%',
    },
    {
      url:
        'https://upyun-assets.ethfans.org/uploads/post/featured_images/36635_small_f564eae6b72c46e1a8a43ef6e4b41a66.jpg',
      title: '每周以太坊',
      width: '40%',
    },
    {
      url:
        'https://upyun-assets.ethfans.org/uploads/photo/image/5ca7121ac7ae45a4a55cddeae218a5cb.jpg',
      title: '跨链技术',
      width: '50%',
    },
    {
      url:
        'https://ethereum.org/assets/img/hero.7b8c3db9.gif',
      title: '系统学习以太坊2.0',
      width: '50%',
    },

  ];

  return (
    <Container className={classes.root} component="section">
      {/* <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography> */}
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

CollectionImageList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollectionImageList);
