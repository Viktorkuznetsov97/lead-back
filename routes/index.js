const { Router } = require('express');

const stateRouter = require('./state');
const leadRouter = require('./lead');

const router = Router();

router.use('/state', stateRouter);

router.use('/lead', leadRouter);

module.exports = router;
