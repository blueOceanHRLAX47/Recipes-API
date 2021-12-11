const Sequelize = require('sequelize');
const DataTypes = require('sequelize')

const sequelize = new Sequelize('fbc', 'postgres', 'postgres', {
  host: '35.236.62.7',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(
    console.log('Success!')
  )
  .catch(err => {
    console.log(err)
  });

sequelize.sync({
  force: false
})

const Recipe = sequelize.define('recipes', {
  name: {
    type: DataTypes.STRING,
  },
  vegan: {
    type: DataTypes.BOOLEAN,
  },
  vegetarian: {
    type: DataTypes.BOOLEAN,
  },
  dairy_free: {
    type: DataTypes.BOOLEAN,
  },
  gluten_free: {
    type: DataTypes.BOOLEAN,
  },
  keto: {
    type: DataTypes.BOOLEAN,
  },
  low_fodmap: {
    type: DataTypes.BOOLEAN,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  instructions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  summary: {
    type: DataTypes.STRING,
  },
  calories: {
    type: DataTypes.INTEGER,
  },
  protien: {
    type: DataTypes.INTEGER,
  },
  fat: {
    type: DataTypes.INTEGER,
  },
  carbs: {
    type: DataTypes.INTEGER,
  },
  popularity_score: {
    type: DataTypes.INTEGER,
  },
  likes: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
})


const SavedRecipe = sequelize.define('SavedRecipe', {
  user_id: {
    type: DataTypes.INTEGER,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
  },
  added_to_calendar: {
    type: DataTypes.BOOLEAN,
  },
  date_on_calendar: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'saved_recipes',
  timestamp: false,
  createdAt: false,
  updatedAt: false
})





// Recipe.hasMany(SavedRecipe);

// Recipe.hasMany(SavedRecipe, {
//   foreignKey: 'recipe_id'
// });
SavedRecipe.belongsTo(Recipe, { foreignKey: 'recipe_id' });


// Recipe.belongsTo(SavedRecipe, { foreignKey: 'recipe_id' });

// const recipes = Recipe.findAll({ include: SavedRecipe });
// console.log(JSON.stringify(recipes, null, 1));



module.exports = {
  sequelize,
  Recipe,
  SavedRecipe
};
