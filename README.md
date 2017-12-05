switch-js
===

Install

---

```
npm i switch-js
```

Example

---

```javascript
const switcher = require('switch-js');
const valueToTest = 'foo';

switcher(valueToTest)
    .case('foo', () => console.log('foo!'))
    .case('bar', () => console.log('bar!'))
    .default(() => console.log('no match found in given cases!'))
    .always(() => console.log('this is cool!'));
```

Check for multiple cases:

```javascript
switcher(valueToTest)
    .cases(['foo', 'bar'], () => console.log('foo or bar!'))
    .default(() => console.log('no match found in given cases!'));
```

Check by a function:

```javascript
switcher(valueToTest)
    .caseWhen(value => typeof value === 'string', () => console.log('a string!'))
    .default(() => console.log('not a string!'));
```

Use switch to set value:

```javascript
const valueInUppercase = switcher(valueToTest)
    .caseTo('foo', 'FOO')
    .caseTo('bar', 'BAR')
    .value('NO_MATCH');
```

`casesTo` and `caseWhenTo` can used to set value similiarly:

```javascript
const valueInUppercase = switcher(valueToTest)
    .casesTo(['foo', 'bar'], 'MATCH')
    .value('NO_MATCH');
```

Use 'caseMap', `casesMap`, `caseWhenMap` and `valueMap` to set the value by a map function:

```javascript
const valueInUppercase = switcher(valueToTest)
    .caseMap('foo', value => 'FOO')
    .caseMap('bar', value => 'BAR')
    .valueMap(value => value.toUpperCase());
```

API

---

- `switch(value)` start a switch chainning
    - `value`

- `case(caseValue[, matchedCallback][, notMatchedCallback])` The case method you are familiar with
    - `caseValue`
    - `matchedCallback` Invoked if `caseValue` equals deeply to `value`
    - `notMatchedCallback` Invoked otherwise

- `cases(caseValues[, matchedCallback][, notMatchedCallback])` Check match for multiple case values
    - `caseValues` Array of `caseValue`
    - `matchedCallback` Invoked if `caseValues` includes `value`
    - `notMatchedCallback` Invoked otherwise

- `caseWhen(matcher[, matchedCallback][, notMatchedCallback])` Check match by a function
    - `matcher` A function to check if `value` is a match
    - `matchedCallback` Invoked if `matcher(value)` returns a truthy value
    - `notMatchedCallback` Invoked otherwise

- `default([noMatchFoundCallback, matchFoundCallback])` The default method you are familiar with
    - noMatchFoundCallback Invoked if no match is found
    - matchFoundCallback Invoked otherwise

- `always(callback)` Invoked anyway
    - callback

- `caseTo(caseValue, valueToExport)`
    - `caseValue`
    - `valueToExport`

- `casesTo(caseValues, valueToExport)`
    - `caseValues` Array of `caseValue`
    - `valueToExport`

- `caseWhenTo(matcher, valueToExport)`
    - `matcher` A function to check if `value` is a match
    - `valueToExport`

- `value(defaultValue)` Export the value
    - `defaultValue` Default value will be exported if provided and no match is found

- `caseMap(caseValue, mapper)`
    - `caseValue`
    - `mapper` A function to map the value to a new one to export

- `casesMap(caseValues, mapper)`
    - `caseValues` Array of `caseValue`
    - `mapper` A function to map the value to a new one to export

- `caseWhenMap(matcher, mapper)`
    - `matcher` A function to check if `value` is a match
    - `mapper` A function to map the value to a new one to export

- `valueMap(mapper)` Export the value by a map function
    - `mapper` A function to map the value to a new one to export