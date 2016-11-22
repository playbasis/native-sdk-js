[![npm version](https://badge.fury.io/js/playbasis.js.svg)](https://badge.fury.io/js/playbasis.js) [![npm version](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md)

## Playbasis Native JS SDK

Playbasis.js allows developers to connect and utilize [Playbasis API](http://doc.playbasis.com/pbapp) with Javascript with Promise support.

## Development Environment

Run `npm install` to install all development dependencies.
Then you can run `gulp unittest` to see the result of testing.

## Building and Testing

To build, run `gulp build`.
It will produce Playbasis.js, and Playbasis.min.js to use with your own project.

To test, run `gulp unittest`.

## How to Use

### Get it via `npm`
Execute `npm install playbasis.js` or `npm install --save playbasis.js`.

Import it in your source file as follows.

```javascript
var Playbasis = require('playbasis.js');
```

### Get it via manual build
Create a distribution of library file included a minified version by executing `gulp build`.
It will create `Playbasis.js` and `Playbasis.min.js` in `./dist` folder.
Include it in your source code via

```javascript
<script src="dist/Playbasis.min.js"></script>
```

### Usage
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

## Document

There's many more apis you can call.
There're 2 options for you.

* Generate it manually via `gulp doc`. Document will be generated at `docs/gen` thus you can look at it offline.
* Go to [API Doc](https://playbasis.github.io/native-sdk-js/). We update it against every release. Thus it's always latest.

## License

Playbasis.js is available under the [MIT license](https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md).
