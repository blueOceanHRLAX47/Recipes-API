const db = require('../database');
const axios = require('axios');
const apiUrlSearch = 'https://api.spoonacular.com/recipes/complexSearch';

const { SpoonacularAPIKey } = require('../config.js');

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};

const controller = {
  getRecipes: (data, callback) => {
    let { stuff } = data;

    let url = `${apiUrlSearch}?apiKey=${SpoonacularAPIKey}&${stuff}=${stuff}`
    axios.get(url, config)
      .then(response => { callback(null, response) })
      .catch(err => { callback(err) })
  },

  getOneRecipe: (data, callback) => {
    console.log(data)
    let id = data.id;
    Number(id)
    let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SpoonacularAPIKey}`
    axios.get(url, config)
      .then(response => { callback(null, response) })
      .catch(err => { callback(err) })
  },

}


module.exports = controller;