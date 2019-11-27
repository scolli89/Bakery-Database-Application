// router
const fs = require('fs');
const express = require('express');
const router = express.Router();

const bakery_controller = require('../controllers/bakery.controller');


router.get('/functionOne',bakery_controller.fOne);
router.get('/functionTwo',bakery_controller.fTwo);
router.get('/functionThree',bakery_controller.fThree);
router.get('/functionFour',bakery_controller.fFour);
router.get('/functionFive',bakery_controller.fFive);
module.exports = router;