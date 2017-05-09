[![npm version](https://badge.fury.io/js/playbasis.js.svg)](https://badge.fury.io/js/playbasis.js) [![npm version](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md)

# Playbasis Native JS SDK

Playbasis.js allows developers to connect and utilize [Playbasis API](http://doc.playbasis.com/pbapp) with Javascript with Promise support.

# Development

The development uses [git branching model](http://nvie.com/posts/a-successful-git-branching-model/) approach, this applies to when you add a new feature and making a new release.

* Clone the project, then `npm install` to install all dependencies to be ready to begin development.
* Add API support especially in `src/api/api.xxx.js` according to which API you're targeting to support for Playbasis end-point. You can  take a look at [Playbasis Live Doc](http://doc.playbasis.com/pbapp) to see which end-point the end-point isn't supported yet.
* Write test case (we use [jasmine](https://jasmine.github.io/) for finished feature you've added in `test/api.xxx.test.js`.
* Make sure tests pass by executing `npm run unittest`.
* When need to publish to NPM, execute `npm publish`. This will begin build process, and automatically generate documentation of SDK in which it will push to remote `gh-pages` branch.
* You're done!

# Available Commands

The following commands can be executed separately. But normally you will just follow steps in _Development_ section above.

* `npm run test` or `npm run uniitest` - run unittest for all tests inside `test/` directory
* `npm run build` - build the project. This will create distribution files inside `dist/`
* `npm run doc` - generate documentation based on comments on each function in source file.
* `npm run deploy` - this command should be run after `npm run doc`. It will copy generated document directory then commit and push to remote `gh-pages` branch serving live documentation there. You can see it at [https://playbasis.github.io/native-sdk-js/](https://.playbasis.github.io/native-sdk-js/).

> Deployment needs [ghp-import](https://github.com/davisp/ghp-import) to be installed on your system. You can install it by executing `pip install ghp-import`. That's it. When you executed command in _Available Commands_ section, it will be used automatically.

# How to Use

## Get it via `npm`
Execute `npm install playbasis.js` or `npm install --save playbasis.js`.

Import it in your source file as follows.

```javascript
var Playbasis = require('playbasis.js');
```

## Get it via manual build
Create a distribution of library file included a minified version by executing `gulp build`.
It will create `Playbasis.js` and `Playbasis.min.js` in `./dist` folder.
Include it in your source code via

```javascript
<script src="dist/Playbasis.min.js"></script>
```

## Usage
Create Playbasis's environment first before calling APIs via the following call.
Get your apikey, and apisecret by registering a new account, and creating a new application at [Playbasis Dashboard](https://www.pbapp.net/login).

```javascript
Playbasis.builder
		.setApiKey("<YOUR-API-KEY-HERE>")
		.setApiSecret("<YOUR-API-SECRET-HERE>")
		.build();
```

Then you're free to call other apis.

Get player's public information.

```javascript
Playbasis.playerApi.playerPublicInfo("jon")
	.then((result) => {
		console.log(result);
	})
	.error((e) => {
		console.log(e.code + ": " + e.message);
	});
```

Execute rule engine `click` action for player id `jon`. This rule is set up via Playbasis Dashboard to give dynamic reward upon executing the call.
By specify `reward`, and `quantity` we can customize reward and its amount to give to player.

```javascript
Playbasis.engineApi.rule("click", "jon", {reward: "point", quantity: 20})
	.then((result) => {
		console.log(result);
	})
	.error((e) => {
		console.log(e.code + ": " + e.message);
	});
```

# Document

There's many more apis you can call.
There're 2 options for you.

* Generate it manually via `npm run doc`. Document will be generated at `docs/` thus you can look at it offline.
* Go to live document (generated and deployed using commands represented in _Available Commands_ section) at [https://playbasis.github.io/native-sdk-js/](https://playbasis.github.io/native-sdk-js/). We update it against every release. Thus it's always latest.

# License

Playbasis.js is available under the [MIT license](https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md).
