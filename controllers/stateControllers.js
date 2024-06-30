const {
  getAllStatesService,
  createStateService,
  updateStateService,
  deleteStateService,
} = require('../services/stateService');

const createStateController = async (req, res) => {
  const { isoCode, name, plan, zones } = req.body;

  if (!isoCode || !name || !plan || !Array.isArray(zones)) {
    res.status(400).send({
      message: 'Required fields: isoCode: string, name: string, plan: number, zones: array',
    });
    return;
  }

  try {
    const state = await createStateService(req.body);
    res.status(201).send(state);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllStatesController = async (req, res) => {
  try {
    const states = await getAllStatesService();
    res.send(states);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStateController = async (req, res) => {
  try {
    const { id } = req.params;
    const stateData = req.body;
    const updatedState = await updateStateService(id, stateData);
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStateController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStateService(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStateController,
  getAllStatesController,
  updateStateController,
  deleteStateController,
};
