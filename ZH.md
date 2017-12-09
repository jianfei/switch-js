switch-js
===

安装
---

```
npm i switch-js
```

示例
---

```javascript
const switcher = require('switch-js');
const valueToTest = 'foo';

switcher(valueToTest)
    .case('foo', () => console.log('foo!'))
    .case('bar', () => console.log('bar!'))
    .default(() => console.log('no match found in given cases!'))
    .always(() => console.log('this is cool!'));

// 输出:
// foo!
// this is cool!
```

一次检查多个值：

```javascript
switcher(valueToTest)
    .cases(['foo', 'bar'], () => console.log('foo or bar!'))
    .default(() => console.log('no match found in given cases!'));

// 输出: foo or bar!
```

使用函数来检查值是否匹配：

```javascript
switcher(valueToTest)
    .caseWhen(value => typeof value === 'string', () => console.log('a string!'))
    .caseWhen(value => typeof value === 'number', () => console.log('a number!'))
    .default(() => console.log('other datatypes!'));

// 输出: a string!
```

使用 `to` 来根据匹配情况赋值：

```javascript
const valueInUppercase = switcher(valueToTest)
    .case('foo').to('FOO!')
    .case('bar').to('BAR!')
    .value('NO MATCH FOUND!');

// 输出: FOO!

// .value('NO MATCH FOUND!')
// 也可以使用下面的语法
// .default().to('NO MATCH FOUND!').value()
```

使用 `mapTo` 通过函数改变原始值

```javascript
const valueInUppercase = switcher(valueToTest)
    .cases(['foo', 'bar']).mapTo(value => value.toUpperCase())
    .default().mapTo(value => value.toUpperCase() + ' IS NOT A MATCH!')
    .value();

// 输出: 'FOO'
```

API
---

### `switch(value)`

开始一个 switch 链
- `value` 需要检查的值

### `case(caseValue[, matchedCallback][, notMatchedCallback])`

你懂的
- `caseValue` 匹配值
- `matchedCallback` Function，可选。如果匹配则执行。
- `notMatchedCallback` Function，可选。如果不匹配则执行。

### `cases(caseValues[, matchedCallback][, notMatchedCallback])`

一次检查多个值
- `caseValues` 包含所有匹配值的数组，如果检查值包括在内，则视为匹配。
- `matchedCallback` Function，可选。如果匹配则执行。
- `notMatchedCallback` Function，可选。如果不匹配则执行。

### `caseWhen(matcher[, matchedCallback][, notMatchedCallback])`

使用函数来检查是否匹配
- `matcher` 一个检查函数，如果返回真值则视为匹配。
- `matchedCallback` Function，可选。如果匹配则执行。
- `notMatchedCallback` Function，可选。如果不匹配则执行。

### `default([noMatchFoundCallback, matchFoundCallback])`

你懂的
- `noMatchFoundCallback` Function，可选。如果没任何匹配则执行。
- `matchFoundCallback` Function，可选。如果找到了匹配则执行。

### `always(callback)`

无论如何都会执行
- `callback` Function

### `to(valueToReturn)`

跟在 `case` 方法后面，如果前面匹配成功，则将返回值设为传入的值。
- `valueToReturn`

### `mapTo(mapper)`

跟 `to` 方法类似，但通过一个方法来改变原始值，并输出到返回值。
- `mapper` Function | String. 如果传入的是字符串，则视为路径并调用 `_.get(valueToTest, path)` 方法来获得值。

### `value(defaultValue)`

输出返回值。
- `defaultValue` 如果没有任何匹配，则返回默认值。
