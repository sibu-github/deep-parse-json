# deep-parse-json

Recursively parses a stringified json and returns javascript object

## Usage

```
  npm install --save deep-parse-json
  or
  yarn add deep-parse-json
```

```
  const { deepParseJson } = require('deep-parse-json')
  const stringified = '{"personList":"[{\\"name\\":\\"siba\\"},{\\"name\\":\\"bhaskar\\"}]"}'
  console.log(deepParseJson(stringified))
  // { personList: [ { name: 'siba' }, { name: 'bhaskar' } ] }
```
