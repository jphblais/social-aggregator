const axios = require('axios');
const assert = require('assert');

assert(process.env.GITHUB_USER, 'Define environment variable GITHUB_USER');
assert(process.env.GITHUB_USER_TOKEN, 'Define environment variable GITHUB_USER_TOKEN');

axios.defaults.baseURL = 'https://api.github.com/graphql';
axios.defaults.auth = {
  username: process.env.GITHUB_USER,
  password: process.env.GITHUB_USER_TOKEN,
};

const graphql = {
  query: 'query ($number_of_repos: Int!, $number_of_gists: Int!) { viewer { url, repositories(isFork: false, last: $number_of_repos, orderBy: { field: PUSHED_AT, direction: DESC}) { nodes { name, description, url } }, gists(last: $number_of_gists, orderBy: { field: PUSHED_AT, direction: DESC}) { nodes { name, description } } } }',
  variables: '{ "number_of_repos": 50, "number_of_gists": 50 }',
};

function getPublicData() {
  return new Promise((resolve, reject) => {
    axios.post('', graphql)
      .then(response => resolve(response.data.data.viewer))
      .catch(error => reject(error));
  });
}

module.exports = {
  getPublicData,
};
