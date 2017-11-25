# social aggregator
Aggregate your social API's content into one GraphQL call.

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


### Tools used to build this app
* [generator-es6-graphql](https://github.com/stylesuxx/generator-es6-graphql#readme)
* And all the other packages in package.json