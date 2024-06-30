const zipcodes = require('zipcodes');

const getZipCodesState = (state) => {
  const allZipCodes = zipcodes.lookupByState(state).map((item) => item.zip);
  return allZipCodes;
};

const getZipCodesCity = ({ city, state }) => {
  const res = zipcodes.lookupByName(city, state).map((item) => item.zip);
  return res;
};

module.exports = { getZipCodesState, getZipCodesCity };
