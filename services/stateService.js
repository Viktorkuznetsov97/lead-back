const State = require('../models/state');
const { getZipCodesState, getZipCodesCity } = require('../utils/zipCodeHelpers');
const { getCountLeadsService } = require('./leadService');

const createStateService = async (stateData) => {
  try {
    const state = new State(stateData);
    const res = await state.save();
    return res;
  } catch (error) {
    console.error('Error creating state:', error);
    throw error;
  }
};

const updateZoneData = async (zone, stateName) => {
  try {
    const zoneCopy = { ...zone };
    const zipCodes = getZipCodesCity({ city: zoneCopy.name, state: stateName });
    const leadsCount = await getCountLeadsService({ zip_code: { $in: zipCodes } });
    zoneCopy.leads_count = leadsCount;
    zoneCopy.zip_codes = zipCodes;
    return zoneCopy;
  } catch (error) {
    console.error('Error updating city data:', error);
    throw error;
  }
};

const updateStateData = async (state) => {
  try {
    const stateCopy = { ...state };
    const zipCodes = getZipCodesState(stateCopy.isoCode);
    const leadsCount = await getCountLeadsService({ zip_code: { $in: zipCodes } });

    stateCopy.leads_count = leadsCount;

    const zonesPromises = stateCopy.zones.map((zone) => updateZoneData(zone, stateCopy.isoCode));
    const zones = await Promise.all(zonesPromises);

    stateCopy.zones = zones;

    return stateCopy;
  } catch (error) {
    console.error('Error updating state data:', error);
    throw error;
  }
};

const getCountStateService = async (options = {}) => {
  const res = await State.countDocuments(options);
  return res;
};

const getAllStatesService = async () => {
  try {
    const states = await State.find();
    const statesCopy = JSON.parse(JSON.stringify(states));
    const statesPromises = statesCopy.map((state) => updateStateData(state));
    const res = await Promise.all(statesPromises);
    return res;
  } catch (error) {
    console.error('Error getting all states:', error);
    throw error;
  }
};

const updateStateService = async (id, stateData) => {
  const state = await State.findById(id);

  if (!state) {
    throw new Error('State not found');
  }

  Object.keys(stateData).forEach((key) => {
    state[key] = stateData[key];
  });

  await state.save();
  return state;
};

const deleteStateService = async (id) => {
  const state = await State.findById(id);

  if (!state) {
    throw new Error('State not found');
  }

  await State.deleteOne({ _id: id });
};

module.exports = {
  createStateService,
  getAllStatesService,
  getCountStateService,
  updateStateService,
  deleteStateService,
};
