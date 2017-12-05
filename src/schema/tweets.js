const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { twitter } = require('../drivers');

const tweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: 'A Tweet from Twitter',
  fields: {
    id: {
      description: 'Id of the Tweet',
      type: GraphQLString,
      resolve(tweet) {
        return tweet.retweeted_status ? tweet.retweeted_status.id_str : tweet.id_str;
      },
    },
    text: {
      description: 'Text of the Tweet',
      type: GraphQLString,
      resolve(tweet) {
        return tweet.retweeted_status ? tweet.retweeted_status.text : tweet.text;
      },
    },
    author: {
      description: 'Author of the tweet',
      type: GraphQLString,
      resolve(tweet) {
        return tweet.retweeted_status ? tweet.retweeted_status.user.name : tweet.user.name;
      },
    },
    Author: {
      description: 'Author of the tweet',
      type: GraphQLString,
      deprecationReason: 'Deprecation test Bad naming',
      resolve(tweet) {
        return tweet.retweeted_status ? tweet.retweeted_status.user.name : tweet.user.name;
      },
    },
    isRetweet: {
      description: 'Is this tweet is a retweet',
      type: GraphQLString,
      resolve(tweet) {
        return tweet.retweeted_status !== undefined;
      },
    },
  },
});

const getUserTimeline = {
  description: 'Get the current user timeline',
  type: new GraphQLList(tweetType),
  resolve() {
    return new Promise((resolve, reject) => {
      twitter.get('statuses/user_timeline', {}, (error, tweets) => {
        if (error) return reject(error);
        return resolve(tweets);
      });
    });
  },
};

module.exports = {
  getUserTimeline,
};
