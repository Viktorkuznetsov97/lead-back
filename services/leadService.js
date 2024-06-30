const Lead = require('../models/lead');

const createLeadService = async (leadData) => {
  const lead = new Lead(leadData);

  const res = await lead.save();
  return res;
};

const getLeadsService = async (options = {}) => {
  const res = await Lead.find(options);
  return res;
};

const getCountLeadsService = async (options = {}) => {
  const res = await Lead.countDocuments(options);
  return res;
};

module.exports = {
  createLeadService,
  getLeadsService,
  getCountLeadsService,
};
