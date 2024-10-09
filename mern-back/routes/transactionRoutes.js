const express = require('express');
const router = express.Router();
const {
    initializeDatabase,
    listTransactions,
    statistics,
    barChart,
    pieChart,
    combinedAPI
} = require('../controllers/transactionController');

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', statistics);
router.get('/bar-chart', barChart);
router.get('/pie-chart', pieChart);
router.get('/combined', combinedAPI);

module.exports = router;
