const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { getItemField } = require('./items');

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: () => ({
    getItem: getItemField
  })
});

module.exports = {
  Schema: new GraphQLSchema({
    query: queryType
  }),
};
