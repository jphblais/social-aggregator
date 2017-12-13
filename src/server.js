const { Schema } = require('./schema');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const path = require('path');
const pkg = require('../package');

const port = process.env.PORT || pkg.configs.port || 1234;
const hostname = process.env.HOSTNAME || pkg.configs.hostname || '127.0.0.1';

process.title = pkg.name;
const server = express();
global.server = server;

server.set('hostname', hostname);
server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));

server.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true,
})));

server.listen(port, hostname, () => {
  console.log(`The server is running at http://${server.get('hostname')}:${server.get('port')}`);
});
