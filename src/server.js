const { Schema } = require('./schema');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const path = require('path');
const pkg = require('../package');

const port = process.env.PORT || pkg.configs.port || 1234;

process.title = pkg.name;
const server = express();
global.server = server;

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));

server.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true,
})));

server.listen(server.get('port'), () => {
  console.log(`The server is running at http://localhost:${server.get('port')}`);
});
