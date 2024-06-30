const { Router } = require('express');
const { getCountLeadsController } = require('../controllers/leadControllers');

const router = Router();

router.get('/count', getCountLeadsController);

module.exports = router;
