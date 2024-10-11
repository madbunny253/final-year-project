const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-app-4',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

