// router
const fs = require('fs');
const express = require('express');
const router = express.Router();

const bakery_controller = require('../controllers/bakery.controller');

//for function 2 the total spent by a customer
router.get('/customers',bakery_controller.getCustomers);
router.post('/customers',bakery_controller.getCustomerSpend);
//for function 1, the insert
router.get('/categories',bakery_controller.getCategories);
router.post('/insertRecipe',bakery_controller.insertRecipe);

//function three, get all recipes, then 
router.get('/recipes',bakery_controller.getAllRecipes);
router.post('/makeRecipe',bakery_controller.makeRecipe);

router.get('/ingredients',bakery_controller.getAllIngredients);
router.post('/recipeIngredients',bakery_controller.getIforR); // get the recipe ingedients for 

//function 4, searching a recipe based on what was entered in the search parameters
router.post('/searchRecipe',bakery_controller.recipeSearch);
// function 5, getting the most popular recipes of  the last ten days. 
router.get('/mostpop',bakery_controller.mostPop);
module.exports = router;