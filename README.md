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

Create a distribution of library file included a minified version by executing `gulp build`.
It will create `Playbasis.js` and `Playbasis.min.js` in `./dist` folder.
Include it in your source code via

```javascript
<script src="dist/Playbasis.min.js"></script>
```

Create Playbasis's environment first before calling APIs via the following call

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
	}, (e) => {
		console.log(e.code + ": " + e.message);
	});
```

Execute rule engine `click` action for player id `jon`. This rule is set up via Playbasis Dashboard to give dynamic reward upon executing the call.
By specify `reward`, and `quantity` we can customize reward and its amount to give to player.

```javascript
Playbasis.engineApi.rule("click", "jon", {reward: "point", quantity: 20})
	.then((result) => {
		console.log(result);
	}, (e) => {
		console.log(e.code + ": " + e.message);
	});
```

There's many more apis you can call.
Better, you can generate SDK document via `gulp doc`. It will generate SDK document (.html) inside `./docs/gen`.

## License

Playbasis.js is available under the [MIT license](https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md).
