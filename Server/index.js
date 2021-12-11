const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');
const { sequelize, Recipe, SavedRecipe } = require('../database');
// const { QueryTypes } = require('sequelize');
const port = 3001;
const { SpoonacularAPIKey } = require('../config.js');
const controller = require('./controllers.js');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use('/', router);


app.get('/recipe', (req, res) => {
  //console.log(req.query);
  controller.getRecipes(req.query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      // console.log('res', results.data)
      res.status(201).send(results.data);
    }
  });
  // console.log(req.body)
  // Recipe.findAll()
  //   .then(recipes => res.send(recipes))
});

app.get('/oneRecipe', (req, res) => {
  // console.log(req.query);
  controller.getOneRecipe(req.query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      // console.log('res', results.data)
      res.status(201).send(results.data);
    }
  });
  // console.log(req.body)
  // Recipe.findAll()
  //   .then(recipes => res.send(recipes))
});

// app.get('/', (req, res) => {
//   // console.log(req.body)
//   Recipe.findAll()
//     .then(recipes => res.send(recipes))
// });

app.get('/savedRecipes', (req, res) => {
  // console.log(req.body)
  SavedRecipe.findAll({
    include: Recipe
  })
    .then(recipes => res.send(recipes))
});



app.post('/savedRecipes', (req, res) => {
  console.log(req.body)
  SavedRecipe.create(req.body)
    .then(recipe => res.send(recipe))
});

app.post('/', (req, res) => {
  // console.log(req.body)
  Recipe.create(req.body)
    .then(recipe => res.send(recipe))
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});