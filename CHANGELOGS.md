# v1.5.1

1. Add retrieveGameSetting() to Playbasis Content API

```
Playbasis
  .contentApi
  .retrieveGameSetting({ node_id: <Your content ID in Dashboard>})
```

retrieveGameSetting() provides key-value store for game setting using the following format

```
numberVar1 > 1
numberVar2 > 9999
booleanVar1 > true
booleanVar2 > false
stringVar1 > Hello world
stringVar2 > https://example.com
```

Example code using retrieveGameSetting()

```
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <script src="lib/Playbasis-1.5.1.js"></script>
</head>

<body>

    <ul>
        <li><button onclick="testRead((resp)=>{ console.log('testRead', resp)})">testRead</button></li>
    </ol>

    <script>
        const API_ENDPOINT = 'https://drgn-api.pbapp.net'
        const API_KEY = 'KEY'
        const API_SECRET = 'SECRET'
        const NODE_ID = 'ExampleGameSetting'
        Playbasis.builder
            .setEndpoint(API_ENDPOINT)
            .setApiKey(API_KEY)
            .setApiSecret(API_SECRET)
            .build()

        function testRead(callback) { 
            Playbasis
                .contentApi
                .retrieveGameSetting({ node_id: NODE_ID})
                .then(callback);
        }
    </script>

</body>

</html>
```

Output
```
{
  booleanVar1: true,
  booleanVar2: false,
  numberVar1: 1,
  numberVar2: 9999,
  stringVar1: "Hello world",
  stringVar2: "https://example.com"
}
```