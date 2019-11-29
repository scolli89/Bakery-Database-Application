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
// function 3, getting the most popular recipes of  the last ten days. 
router.get('/mostpop',bakery_controller.mostPop);
//
router.get('/functionFive',bakery_controller.fFive);
module.exports = router;