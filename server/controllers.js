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
    let query = data.query;
    let diet= data.diet;
    let intolerances = data.intolerances;
    console.log(data.query)
    let url = `${apiUrlSearch}?apiKey=${SpoonacularAPIKey}&query=${query}&diet==${diet}&intolerances=${intolerances}&instructionsRequired=true`
    axios.get(url, config)
      .then(response => { callback(null, response) })
      .catch(err => { callback(err) })
  },

  getOneRecipe: (data, callback) => {

    let id = data.id;
    let { title } = data;
    Number(id)
    let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SpoonacularAPIKey}`
    axios.get(url, config)
      .then(response => {
        let ingredients = [];

        //console.log(response.data.extendedIngredients)
        response.data.extendedIngredients.forEach((ingredient) => {
          ingredients.push(ingredient.originalString)
        })
        let res = {
          name: response.data.title,
          vegan: response.data.vegan,
          vegetarian: response.data.vegetarian,
          dairy_free: response.data.dairyFree,
          gluten_free: response.data.glutenFree,
          keto: response.data.keto,
          low_fodmap: response.data.lowFodmap,
          ingredients: ingredients,
          instructions: response.data.instructions,
          summary: response.data.summary,
          popularity_score: response.data.spoonacularScore,
          likes: response.data.aggregateLikes,
          spoon_recipe_id: response.data.id,
          readyInMinutes: response.data.readyInMinutes
        }
        callback(null, res)
      })
      .catch(error => { callback(error) })
  },

  getOneRecipeNutrition: (data, callback) => {
    let id = data.id;
    Number(id)
    let url = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${SpoonacularAPIKey}`
    axios.get(url, config)
      .then(response => {
        let res = {
          calories: response.data.calories,
          protein: response.data.protein,
          fat: response.data.fat,
          carbs: response.data.carbs,
        }
        callback(null, res)
      })
      .catch(error => { callback(error) })
  },

}


module.exports = controller;