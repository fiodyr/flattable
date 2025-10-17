# flattable

Utility helpers for expanding hierarchical header rows into flat tables.

## propagateHeaders

`propagateHeaders(rows, options)` duplicates the hierarchical values (such as "Категория" and "Бренд") into dedicated columns and forward-fills them through the dataset until the value changes.

```js
const { propagateHeaders } = require('./src/propagateHeaders');

const rows = [
  ['Категория: Телевизоры', '', ''],
  ['Бренд: Samsung', '', ''],
  ['TV 42"', '', '500'],
  ['TV 50"', '', '700'],
  ['Бренд: LG', '', ''],
  ['TV 55"', '', '650'],
  ['Категория: Наушники', '', ''],
  ['Бренд: Sony', '', ''],
  ['WH-1000XM5', '', '300'],
];

console.table(propagateHeaders(rows));
```
