const {
  createLeadService,
  getLeadsService,
  getCountLeadsService,
} = require('../services/leadService');

const createLeadController = async (req, res) => {
  try {
    const lead = await createLeadService(req.body);
    res.status(201).send(lead);
  } catch (error) {
    res.status(500).send('Error creating lead');
  }
};

const getAllLeadsController = async (req, res) => {
  try {
    const leads = await getLeadsService();
    const count = await getCountLeadsService();
    res.send({ count, data: leads });
  } catch (error) {
    res.status(500).send('Error fetching leads');
  }
};

const getCountLeadsController = async (req, res) => {
  try {
    const count = await getCountLeadsService();
    res.send({ count });
  } catch (error) {
    res.status(500).send('Error fetching leads');
  }
};

module.exports = {
  createLeadController,
  getAllLeadsController,
  getCountLeadsController,
};
