const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const Items = require('../lib/items');

const items = new Items();

const itemType = new GraphQLObjectType({
  name: 'Item',
  description: 'An item.',
  fields: {
    id: {
      description: 'The items id.',
      type: GraphQLInt,
    },
    name: {
      description: 'The items name.',
      type: GraphQLString,
    },
  },
});

const getById = {
  description: 'Get an item by id.',
  type: itemType,
  args: {
    id: {
      description: 'ID of the item to retreive.',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (root, { id }) => items.getById(id),
};

module.exports = {
  getItemField: getById,
};
