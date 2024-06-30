const zipcodes = require('zipcodes');
require('dotenv').config();
const { getAllLeadsService } = require('./services/leadService');

require('./database/database');

const findAllUsersCity = async () => {
  const users = await getAllLeadsService();

  const states = {};

  users.forEach((user) => {
    const userPlace = zipcodes.lookup(user.zip_code);
    const userState = userPlace.state;
    const userCity = userPlace.city;

    if (!states[userState]) {
      states[userState] = {};
      states[userState].count = 1;
    } else {
      states[userState].count += 1;
    }

    if (!states[userState][userCity]) {
      states[userState][userCity] = {};
      states[userState][userCity].count = 1;
    } else {
      states[userState][userCity].count += 1;
    }
  });
  console.log(states);
};

findAllUsersCity();
