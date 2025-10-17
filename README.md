# flattable

Utility helpers for expanding hierarchical header rows into flat tables.

## propagateHeaders

`propagateHeaders(rows, options)` duplicates the hierarchical values (such as "Категория" and "Бренд") into dedicated columns and forward-fills them through the dataset until the value changes. The default header detector automatically normalizes non-string cells, so values coming from spreadsheet exports or React-table structures are still processed safely.

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

### Настройка индексов

Все индексы передаются в нотации JavaScript (отсчёт с нуля). Если ячейка, по которой определяется заголовок, находится в 16‑м столбце (порядковый номер 15), передайте `headerColumnIndex: 15`. Ниже показан пример, где первые 15 колонок — вспомогательные, а искомый текст находится в 16‑й колонке.

```js
const fillerColumns = Array(15).fill('');

const rows = [
  [...fillerColumns, 'Категория: Телевизоры', '', ''],
  [...fillerColumns, 'Бренд: Samsung', '', ''],
  [...fillerColumns, 'TV 42"', '', '500'],
  [...fillerColumns, 'TV 50"', '', '700'],
  [...fillerColumns, 'Бренд: LG', '', ''],
  [...fillerColumns, 'TV 55"', '', '650'],
  [...fillerColumns, 'Категория: Наушники', '', ''],
  [...fillerColumns, 'Бренд: Sony', '', ''],
  [...fillerColumns, 'WH-1000XM5', '', '300'],
];

const flattened = propagateHeaders(rows, { headerColumnIndex: 15 });
console.table(flattened);
```

При необходимости можно также переопределить `valueColumnIndex`, если цена/значение расположены не в последней колонке.
