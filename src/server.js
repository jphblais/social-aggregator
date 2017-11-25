const { Schema } = require('./schema');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const path = require('path');

const config = require('./config/main.json');
const port = (!global.process.env.PORT) ? 1234 : global.process.env.PORT;
const server = global.server = express();

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));

server.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true
})));

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});
