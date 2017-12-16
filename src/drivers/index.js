const Twitter = require('twitter');
const githubAPI = require('./github');

const twitterOauth = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const twitter = new Twitter(twitterOauth);

module.exports = {
  twitter,
  githubAPI,
};
