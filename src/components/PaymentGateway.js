import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useParams } from 'react-router-dom';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: 'none',
  },
  gateway: {
    borderRadius: '10px',
    border: '1px solid',
    margin: '2em 12em',
    padding: '2em 4em',
    [theme.breakpoints.down('sm')]: {
      margin: '2em',
      padding: '1em',
    }
  },
  cardNoField: {
    width: '25%',
    margin: '1em',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    }
  },
  fields: {
    margin: '1em',
  }
}));

const PaymentGateway = () => {
  const classes = useStyles();
  const { id } = useParams()
  const [recipe, setRecipe] = useState([])
  const [qty, setQty] = useState(1)
  const [cardNo, setCardNo] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [status, setStatus] = useState('LOADING')


  useEffect(() => {
    axios.get('http://starlord.hackerearth.com/recipe')
      .then((response) => {
        setRecipe(response.data.find(o => o.id === parseInt(id)))
        setStatus('SUCCESS')
      })
      .catch((error) => {
        setStatus('ERROR')
        console.log(error)
      })
  }, [id])

  return (
    <>
      {status === 'LOADING' ?
        <CircularProgress />
        :
        <>
          <div>
            <div>
              <Typography className={classes.text} variant='h4'>
                {'Order Summary'}
              </Typography>
              <Typography className={classes.text} variant='body1'>
                {`Recipe: ${recipe.name}`}
              </Typography>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                type='number'
                onChange={(e) => setQty(e.target.value)}
              />
              <Typography variant='body1'>
                {`Total Price: $ ${Math.round(recipe.price * qty * 100) / 100}`}
              </Typography>
            </div>

            <div className={classes.gateway}>
              <span style={{ fontSize: '1.5em', fontWeight: '600' }}>{'Payment Method: Credit/Debit Card'}</span>
              <br />
              <span style={{ fontSize: '1em' }}>{'Enter Card Details'}</span>
              <br />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  className={classes.cardNoField}
                  label="Card Number"
                  required
                  onChange={(e) => setCardNo(e.target.value)}
                  variant="outlined"
                />
                <div style={{ display: 'flex' }}>
                  <TextField
                    className={classes.fields}
                    label="Expiry Date"
                    placeholder="MM/YY"
                    required
                    onChange={(e) => setExpiryDate(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.fields}
                    label="CVV"
                    variant="outlined"
                    required
                    onChange={(e) => setCvv(e.target.value)}
                    inputProps={{ maxLength: 3 }}
                  />
                </div>
              </div>

              <Link to="/otp"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  style={{ background: 'green', color: '#ffffff' }}
                  disabled={cardNo.length === 0 || cvv.length === 0 || expiryDate.length === 0}>
                  {'Proceed to Pay'}
                </Button>
              </Link>

            </div>
          </div>
        </>
      }
    </>
  );
}

export default PaymentGateway;