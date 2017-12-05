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

// result:
// foo!
// this is cool!
```

Check for multiple cases:

```javascript
switcher(valueToTest)
    .cases(['foo', 'bar'], () => console.log('foo or bar!'))
    .default(() => console.log('no match found in given cases!'));

// result: foo or bar!
```

Check if match by a function:

```javascript
switcher(valueToTest)
    .caseWhen(value => typeof value === 'string', () => console.log('a string!'))
    .default(() => console.log('not a string!'));

// result: a string!
```

Use switch to set value:

```javascript
const valueInUppercase = switcher(valueToTest)
    .caseTo('foo', 'FOO')
    .caseTo('bar', 'BAR')
    .value('NO_MATCH');

// result: FOO
```

`casesTo` and `caseWhenTo` can used to set value in similiar way:

```javascript
const valueInUppercase = switcher(valueToTest)
    .casesTo(['foo', 'bar'], 'MATCH')
    .value('NO_MATCH');

// result: MATCH

const valueInUppercase = switcher(valueToTest)
    .caseWhenTo(value => value.startsWith('f'), 'FOO')
    .caseWhenTo(value => value.startsWith('b'), 'BAR')
    .value('NO_MATCH');

// result: FOO
```

Use `caseMap`, `casesMap`, `caseWhenMap` and `valueMap` to set the value by a map function:

```javascript
const valueInUppercase = switcher(valueToTest)
    .caseMap('foo', value => value + ' starts with f')
    .caseMap('bar', value => value + ' starts with b')
    .valueMap(value => value + ' has no match');

// result: foo starts with f
```

API
---

- `switch(value)` start a switch chainning
    - `value` Value to check

- `case(caseValue[, matchedCallback][, notMatchedCallback])` The case method you are familiar with
    - `caseValue`
    - `matchedCallback` Function, optional. Invoked if `caseValue` equals deeply to `value`
    - `notMatchedCallback` Function, optional. Invoked otherwise

- `cases(caseValues[, matchedCallback][, notMatchedCallback])` Check match for multiple case values
    - `caseValues` Array of `caseValue`
    - `matchedCallback` Function, optional. Invoked if `caseValues` includes `value`
    - `notMatchedCallback` Function, optional. Invoked otherwise

- `caseWhen(matcher[, matchedCallback][, notMatchedCallback])` Check match by a function
    - `matcher` A match function used to check if `value` is a match
    - `matchedCallback` Function, optional. Invoked if `matcher(value)` returns a truthy value
    - `notMatchedCallback` Function, optional. Invoked otherwise

- `default([noMatchFoundCallback, matchFoundCallback])` The default method you are familiar with
    - `noMatchFoundCallback` Function, optional. Invoked if no match is found
    - `matchFoundCallback` Function, optional. Invoked otherwise

- `always(callback)` Invoked anyway
    - `callback` Function

- `caseTo(caseValue, valueToExport)`
    - `caseValue`
    - `valueToExport` The value you want to set if match

- `casesTo(caseValues, valueToExport)`
    - `caseValues` Array of `caseValue`
    - `valueToExport` The value you want to set if match

- `caseWhenTo(matcher, valueToExport)`
    - `matcher` A function to check if `value` is a match
    - `valueToExport` The value you want to set if match

- `value(defaultValue)` Export the value
    - `defaultValue` Default value will be set if no match is found

- `caseMap(caseValue, mapper)`
    - `caseValue`
    - `mapper` A function to map the value to a new one to set

- `casesMap(caseValues, mapper)`
    - `caseValues` Array of `caseValue`
    - `mapper` A function to map the value to a new one to set

- `caseWhenMap(matcher, mapper)`
    - `matcher` A function to check if `value` is a match
    - `mapper` A function to map the value to a new one to set

- `valueMap(mapper)` Export the value by a map function
    - `mapper` A function to map the value to a new one to set