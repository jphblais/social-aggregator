const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { getUserTimeline } = require('./tweets');

const { getItemField } = require('./items');

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: {
    getUserTimeline,
    getItem: getItemField,
  },
});

module.exports = {
  Schema: new GraphQLSchema({
    query: queryType,
  }),
};
