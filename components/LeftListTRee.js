import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios';

import MuiLink from '@material-ui/core/Link';
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
  resetContainer: {
    // padding: theme.spacing(3),
  },
  toolbarLink:{
    fontSize: '0.875rem !important',
    whiteSpace:'normal !important'
  }
});

function getSteps() {
  return [
        {title:'第一篇-区块链入门'},
        {title:'第二篇-比特币区结构'},
        {title:'第三篇-以太坊相关'},
        {title:'第四篇-eos'},
        {title:'第一篇-区块链入门'},
        {title:'第二篇-比特币区结构'},
        {title:'第三篇-以太坊相关'},
        {title:'第四篇-eos'},
        {title:'第二篇-比特币区结构'},
        {title:'第三篇-以太坊相关'},
        {title:'第四篇-eos'},
    ];
}

const steps = [
        {title:'第一篇-区块链入门'},
        {title:'第二篇-比特币区结构'},
        {title:'第三篇-以太坊相关'},
        {title:'第四篇-eos'},
        {title:'第一篇-区块链入门'},
        {title:'第二篇-比特币区结构'},
        {title:'第三篇-以太坊相关'},
        {title:'第四篇-eos'},
        {title:'第二篇-比特币区结构'},
        {title:'第三篇-以太坊相关'},
        {title:'第四篇-eos'},
  ];

class LeftListTRee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {steps: []};
  }

  async componentDidMount() {
      const results = await axios.get(`https://api.xuexi.one/api/collectionwitharticle/?collection=${this.props.collection}&limit=50`);
      this.setState({
        steps:results.data.results
      });

      // console.log('steps',results.data.results);
  }

  render() {
    const { classes,collection } = this.props;
    const { steps } = this.state;
    const stepsindex = steps.findIndex(item => item.id === this.props.id);
    return (
      <div className={classes.root}>
        <Stepper activeStep={stepsindex} orientation="vertical">
          {steps.map(({id,new_title}, index) => (
            <Step key={index} color='coral' styles={{color:'coral'}} completed={false} >
              <StepLabel>
                  <MuiLink
                  color="inherit"
                  noWrap
                  // key={section}
                  variant="body2"
                  href={`/p/${id}`}
                  className={classes.toolbarLink}
                >
                  {new_title}
                </MuiLink>
                {/* {new_title} */}
              </StepLabel>
              <StepContent>
              </StepContent>

            </Step>
          ))}
        </Stepper>
      </div>
    )
  }
}

LeftListTRee.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftListTRee);
