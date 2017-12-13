const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql');

const { twitter } = require('../drivers');

const author = new GraphQLObjectType({
  name: 'Author',
  description: 'Author of the Tweet',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    screenName: {
      type: GraphQLString,
      resolve: user => user.screen_name,
    },
    url: {
      type: GraphQLString,
      resolve: user => `https://twitter.com/${user.screen_name}`,
    },
  },
});

const tweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: 'A Tweet from Twitter',
  fields: {
    id: {
      description: 'Id of the Tweet',
      type: GraphQLID,
      resolve(tweet) {
        return tweet.retweeted_status ? tweet.retweeted_status.id : tweet.id;
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
      type: author,
      resolve(tweet) {
        return tweet.retweeted_status ? tweet.retweeted_status.user : tweet.user;
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

const twitterTimeline = {
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
  twitterTimeline,
};
