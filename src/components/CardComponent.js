import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  recipeCard: {
    width: '100%',
    height: '100%',
    borderRadius: '5%',
    boxShadow: '2px 2px 9px 0px #c3a0a0',
    maxWidth: 345,
    [theme.breakpoints.down('sm')]: {
      maxHeight: '20em',
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  heading: {
    fontFamily: 'none',
    fontSize: '1.16rem'
  },
  chip: {
    height: '1em',
    margin: '1em 0 2em',
  },
  price: {
    fontSize: '1.5em',
    fontWeight: 700,
  },
  text: {
    fontFamily: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
}));

const CardComponent = ({ recipe }) => {
  const classes = useStyles();
  const chipProp = {
    'Hot': '🔥',
    'Spicy': '🌶️',
    'New': '🆕',
    'clone': ' ',
    'weird': ' ',
  }
  const chipColor = {
    'Hot': 'yellow',
    'Spicy': 'red',
    'New': 'blue',
    'clone': 'orange',
    'weird': 'grey',
  }
  return (
    <Link
      to={`/order/${recipe.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card className={classes.recipeCard}>
        <CardHeader
          className={classes.heading}
          title={recipe.name}
        />
        <CardMedia
          className={classes.media}
          image={recipe.image}
          title={recipe.name}
        />
        <div className={classes.chip} >
          {recipe.label.length > 0 &&
            <Chip
              style={{ backgroundColor: chipColor[recipe.label], color: recipe.label === 'Hot' ? '#f00' : '' }}
              label={`${chipProp[recipe.label]}${recipe.label}`}
              size="medium"
              color="primary"
            />}
          {recipe.category.length > 0 &&
            <Chip
              label={recipe.category}
              size="medium"
              color="secondary"
            />}
        </div>
        <div className={classes.price}>
          {`$ ${recipe.price}`}
        </div>
        <CardContent>
          <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
            {recipe.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardComponent;