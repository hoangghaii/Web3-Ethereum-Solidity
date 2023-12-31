const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Delete entire build folder
const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);

// Read 'Campaign.sol' from 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

const source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source, 1).contracts;

// Create build folder
fs.ensureDirSync(buildPath);

// Write output to build folder
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(':', '').concat('.json')),
    output[contract],
  );
}
