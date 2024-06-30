const { Router } = require('express');
const {
  getAllStatesController,
  createStateController,
  updateStateController,
  deleteStateController,
} = require('../controllers/stateControllers');

const router = Router();

router.get('/', getAllStatesController);

router.post('/', createStateController);

router.patch('/:id', updateStateController);

router.delete('/:id', deleteStateController);

module.exports = router;
