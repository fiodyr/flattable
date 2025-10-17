const { propagateHeaders } = require('./propagateHeaders');

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

const result = propagateHeaders(rows);
console.log(result);
