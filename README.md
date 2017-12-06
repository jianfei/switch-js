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

Check if value is matched by a function:

```javascript
switcher(valueToTest)
    .caseWhen(value => typeof value === 'string', () => console.log('a string!'))
    .caseWhen(value => typeof value === 'number', () => console.log('a number!'))
    .default(() => console.log('other datatypes!'));

// result: a string!
```

Use `to` to set value:

```javascript
const valueInUppercase = switcher(valueToTest)
    .case('foo').to('FOO!')
    .case('bar').to('BAR!')
    .value('NO MATCH FOUND!');

// result: FOO!

// .value('NO MATCH FOUND!')
// has the same effect as
// .default().to('NO MATCH FOUND!').value()
```

Use `mapTo` to set the value by a function:

```javascript
const valueInUppercase = switcher(valueToTest)
    .cases(['foo', 'bar']).mapTo(value => value.toUpperCase())
    .default().mapTo(value => value.toUpperCase() + ' IS NOT A MATCH!')
    .value();

// result: 'FOO'
```

API
---

### `switch(value)`

start a switch chain
- `value` Value to check

### `case(caseValue[, matchedCallback][, notMatchedCallback])`

The case method you know
- `caseValue`
- `matchedCallback` Function, optional. Invoked if `caseValue` equals deeply to `value`
- `notMatchedCallback` Function, optional. Invoked otherwise

### `cases(caseValues[, matchedCallback][, notMatchedCallback])`

Check for multiple case values
- `caseValues` Array of `caseValue`
- `matchedCallback` Function, optional. Invoked if `caseValues` includes `value`
- `notMatchedCallback` Function, optional. Invoked otherwise

### `caseWhen(matcher[, matchedCallback][, notMatchedCallback])`

Check by a function
- `matcher` A match function used to check if `value` is a match
- `matchedCallback` Function, optional. Invoked if `matcher(value)` returns a truthy value
- `notMatchedCallback` Function, optional. Invoked otherwise

### `default([noMatchFoundCallback, matchFoundCallback])`

The default method you know
- `noMatchFoundCallback` Function, optional. Invoked if no match is found
- `matchFoundCallback` Function, optional. Invoked otherwise

### `always(callback)`

Invoked anyway
- `callback` Function

### `to(valueToReturn)`

Set a new value to return by `value()` if previous case is a match or it follows `default()`
- `valueToReturn`

### `mapTo(mapper)`

Similiar to `to()` but set value by a mapper function
- `mapper` Function | String. If a string is passed, it will take as a path and invoke `_.get(valueToTest, path)` from lodash

### `value(defaultValue)`

Return the value
- `defaultValue` Default value will return if no match is found
