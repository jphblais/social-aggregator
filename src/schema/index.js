const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { twitterTimeline } = require('./tweets');

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: {
    twitterTimeline,
  },
});

module.exports = {
  Schema: new GraphQLSchema({
    query: queryType,
  }),
};
