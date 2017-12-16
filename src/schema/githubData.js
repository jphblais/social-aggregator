const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { githubAPI } = require('../drivers');

const repository = new GraphQLObjectType({
  name: 'Repository',
  description: 'A Repository',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
  },
});

const snippet = new GraphQLObjectType({
  name: 'Snippet',
  description: 'A code snippet',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const githubType = new GraphQLObjectType({
  name: 'GitHub',
  description: 'User GitHub public repositories & gists',
  fields: {
    url: {
      description: 'GitHub URL of the user',
      type: GraphQLString,
    },
    repositories: {
      description: 'User public repositories',
      type: new GraphQLList(repository),
      resolve: (obj => obj.repositories.nodes),
    },
    snippets: {
      description: 'User public snippets/gists',
      type: new GraphQLList(snippet),
      resolve: (obj => obj.gists.nodes),
    },
  },
});

const githubData = {
  name: 'Repositories',
  description: 'GitHub repositories of the loggedin user',
  type: githubType,
  resolve: () => githubAPI.getPublicData(),
};

module.exports = {
  githubData,
};
