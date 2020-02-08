const express = require('express');
const DevCtrl = require('../src/Controllers/DevCtrl');
const SearchCtrl = require('../src/Controllers/SearchCtrl');

const router = express.Router();

router.post('/dev',DevCtrl.store);
router.get('/dev',DevCtrl.index);

router.get('/search',SearchCtrl.index);

module.exports = router;