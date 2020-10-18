import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5em',
    width: 'fit-content',
    margin: 'auto',
    alignContent: 'center'
  }
}))

const OtpForm = () => {
  const classes = useStyles()
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('INITIAL_STATE')

  const handleSubmit = () => {
    if (otp === '123456')
      setStatus('SUCCESS')
    else
      setStatus('ERROR')
  }

  switch (status) {
    case 'INITIAL_STATE':
      return (
        <div className={classes.root}>
          <span>{'Enter OTP'}</span>
          <TextField
            style={{ margin: '1em' }}
            label="OTP"
            variant="outlined"
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
          />
          <Button
            style={{ background: 'green', color: '#ffffff' }}
            disabled={otp.length === 0}
            onClick={handleSubmit}>
            {'Submit'}
          </Button>
        </div>
      )
    case 'SUCCESS':
      return (
        <div className={classes.root}>
          <span style={{ color: 'green', marginBottom: '2em' }}>{'Transaction is successful and your order is placed!'}</span>
          <Link to="/"
            style={{ textDecoration: 'none' }}
          >
            <Button style={{ background: 'green', color: '#ffffff' }} >
              {'Go Home'}
            </Button>
          </Link>
        </div>
      )
    case 'ERROR':
      return (
        <div className={classes.root}>
          <span style={{ color: 'red', marginBottom: '2em' }}>{'The OTP seems to be incorrect. Try Later'}</span>
          <Link to="/"
            style={{ textDecoration: 'none' }}
          >
            <Button style={{ background: 'green', color: '#ffffff' }} >
              {'Go Home'}
            </Button>
          </Link>
        </div>
      )
    default:
      break
  }
}

export default OtpForm;