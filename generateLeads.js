/* eslint-disable */
const { faker } = require('@faker-js/faker');
const zipcodes = require('zipcodes');
require('dotenv').config();
const Lead = require('./models/lead');
require('./database/database');

// const largestStates = ['PA'];
const largestStates = ['CA', 'TX', 'FL', 'NY', 'PA'];
const leadsToGenerate = 832;
const zipCodesPerState = 6;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomLeads = async () => {
  try {
    const leads = [];

    largestStates.forEach((state) => {
      const zipCodes = zipcodes.lookupByState(state);

      const zipCodesRandom = [];

      for (let i = 0; i < zipCodesPerState; i += 1) {
        const randomIndex = getRandomInt(0, zipCodes.length);
        zipCodesRandom.push(zipCodes[randomIndex].zip);
      }

      for (let i = 0; i < leadsToGenerate / largestStates.length; i += 1) {
        const lead = {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          zip_code: zipCodesRandom[getRandomInt(0, zipCodesPerState - 1)],
        };

        leads.push(lead);
      }
    });

    await Lead.insertMany(leads);
    console.log(`good`);
  } catch (err) {
    console.error('Error:', err);
  }
};

generateRandomLeads();
