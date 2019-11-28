// router
const fs = require('fs');
const express = require('express');
const router = express.Router();

const bakery_controller = require('../controllers/bakery.controller');


router.get('/customers',bakery_controller.getAllCustomers);
router.get('/categories',bakery_controller.getAllCategories);
router.get('/recipes',bakery_controller.insertRecipe);
router.get('/functionFour',bakery_controller.fFour);
router.get('/functionFive',bakery_controller.fFive);
module.exports = router;