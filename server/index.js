const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { sequelize, Recipe, SavedRecipe } = require('../database');
const { SpoonacularAPIKey } = require('../config.js');
const controller = require('./controllers.js');
const port = 3001;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/recipes', (req, res) => {
  console.log('here', req.query)
  controller.getRecipes(req.query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      console.log(results.data)
      res.status(201).send(results.data);
    }
  });
});

///// Database End Point
// app.get('/', (req, res) => {
//   Recipe.findAll()
//     .then(recipes => res.send(recipes))
// });

app.get('/oneRecipe', (req, res) => {
  controller.getOneRecipe(req.query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(results);
    }
  });
});

app.get('/oneRecipeNutrition', (req, res) => {
  controller.getOneRecipeNutrition(req.query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(results);
    }
  });
});

app.get('/savedRecipes', (req, res) => {
  console.log(req.query)
  const user_id = req.query.user_id;
  SavedRecipe.findAll({
    where: { user_id: user_id }
  })
    .then(recipes => res.send(recipes))
    .catch(error => res.send(error))
});

app.post('/savedRecipes', (req, res) => {
  console.log(req.body)
  SavedRecipe.create(req.body)
    .then(recipe => res.send(recipe))
    .catch(error => res.send(error))
});

app.post('/addRecipe', (req, res) => {
  Recipe.create(req.body)
    .then(recipe => res.send(recipe))
    .catch(error => res.send(error))
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});