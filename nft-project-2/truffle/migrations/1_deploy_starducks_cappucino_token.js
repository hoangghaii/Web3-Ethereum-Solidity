const StarDucksCappucinoToken = artifacts.require('StarDucksCappucinoToken');
require('dotenv').config({ path: '../.env' });

const { INITIAL_TOKEN } = process.env;

module.exports = function (deployer) {
  deployer.deploy(StarDucksCappucinoToken, parseInt(INITIAL_TOKEN));
};
