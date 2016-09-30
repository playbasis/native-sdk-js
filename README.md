## Playbasis Native JS SDK

Playbasis.js aims to be a dependency-free library allows developers to connect and integrate their web-based application to [Playbasis API](http://doc.playbasis.com/pbapp).

## Development Environment

Run `npm install` to install all development dependencies.
Then you can run `gulp unittest` to see the result of testing.

## Contribution Guideline

As Playbasis.js aims to have minimal dependecies, take a moment to consider if such dependencies are needed before including.
Every change should possibly has test case. Whenever finish making change, run `gulp unittest` to see the result before moving on.

## Building and Testing

To build, run `gulp build`.
It will produce Playbasis.js, and Playbasis.min.js to use with your own project.

To test, run `gulp unittest`.

## License

Playbasis.js is available under the [MIT license](https://github.com/playbasis/native-sdk-js/blob/master/LICENSE.md).
