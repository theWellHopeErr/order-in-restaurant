import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardComponent from './CardComponent'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    adding: '1em 0 3em',
  },
  heading: {
    fontFamily: 'Patrick Hand',
    color: '#f00',
  },
  recipeList: {
    display: 'flex',
    margin: '2em 6em 0',
    [theme.breakpoints.down('sm')]: {
      margin: '2em 1.5em 0',
    }
  }
}))

const MainContainer = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([])
  const [status, setStatus] = useState('LOADING')

  useEffect(() => {
    axios.get('http://starlord.hackerearth.com/recipe')
      .then((response) => {
        setRecipes(response.data)
        setStatus('SUCCESS')
      })
      .catch((error) => {
        setStatus('ERROR')
        console.log(error)
      })
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.heading}>
        {"Order In Restaurant"}
      </Typography>
      {status === 'LOADING' ?
        <CircularProgress />
        :
        <div className={classes.recipeList}>
          <Grid container justify={'center'} spacing={3}>
            {
              recipes.map(recipe =>
                <Grid key={recipe.id} item xs={6} sm={3}>
                  <CardComponent recipe={recipe} />
                </Grid>
              )
            }
          </Grid>
        </div>
      }
    </div>
  );
}

export default MainContainer;