const { propagateHeaders } = require('./propagateHeaders');

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

const result = propagateHeaders(rows, { headerColumnIndex: 15 });
console.log(result);
