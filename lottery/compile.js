const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: { '*': { '*': ['*'] } },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

function getCompiled(fileName) {
  const inboxPath = path.resolve(__dirname, 'contracts', fileName);
  const source = fs.readFileSync(inboxPath, 'utf8');

  const input = {
    language: 'Solidity',
    sources: {
      fileName: {
        content: source,
      },
    },
    settings: {
      outputSelection: { '*': { '*': ['*'] } },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

  return output[fileName].Inbox;
}

module.exports = output['Inbox.sol'].Inbox;
