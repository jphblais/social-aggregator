# social aggregator
Aggregate your social API's content into one GraphQL call.

## Pupose
For me to learn GraphQL.  For my student contributor (Dérek Falco), to learn JavaScript and modern web development.
For my website to be more dynamic with less maintenance (no more personal blog).

## Usage

### Start the Development Server
```Bash
npm start
```

When starting the server there are a couple of parameters you can pass:
* verbose - Enable verbose output
* release - Enable release mode, which will generally disable debugging features

Hot reloading is in place, so you do not need to restart the server on file change.

#### Environment Variables
The following environment variables are supported:
* PORT - defaults to 1234 if not set

### Deployment
If you want to deploy your application, simply copy the build folder and invoke
```Bash
node server.js
```

## Big Picture

1) Client Query content with a GraphQL Query
2) Social Aggregator service analyse Query and send parallel requests (2.*) to social services API's
3) Social services API's send back contents/responses (3.*)
4) Social Aggregator merge social contents into an unified content and send it to the client.

![alt text][big-picture]

[big-picture]: https://raw.githubusercontent.com/jphblais/social-aggregator/develop/docs/big-picture.png "Big Picture"



## Tools used to build this app
* [generator-es6-graphql](https://github.com/stylesuxx/generator-es6-graphql#readme)
* And all the other packages in package.json