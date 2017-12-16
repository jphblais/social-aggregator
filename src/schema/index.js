const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { twitterTimeline } = require('./tweets');
const { githubData } = require('./githubData');

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: {
    twitterTimeline,
    githubData,
  },
});

module.exports = {
  Schema: new GraphQLSchema({
    query: queryType,
  }),
};
