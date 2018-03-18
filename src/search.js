import _ from 'lodash';
import cryptoData from './crypto.json';

export default _input => {
  const exactMatch = cryptoData.filter(
    crypto =>
      crypto.name.toLowerCase() === _input.toLowerCase() ||
      crypto.symbol.toLowerCase() === _input.toLowerCase()
  );
  const sortedExactKeys = Object.keys(exactMatch).sort(
    (a, b) => exactMatch[a].name.length - exactMatch[b].name.length
  );
  const sortedExactMatch = sortedExactKeys.map(key => exactMatch[key]);
  const startsWithRegex = new RegExp(`^${_input}`, 'gi');
  const startsWithMatch = cryptoData.filter(
    crypto =>
      crypto.name.toLowerCase().match(startsWithRegex) ||
      crypto.symbol.toLowerCase().match(startsWithRegex)
  );
  const sortedStartsWithKeys = Object.keys(startsWithMatch).sort(
    (a, b) => startsWithMatch[a].name.length - startsWithMatch[b].name.length
  );
  const sortedStartsWithMatch = sortedStartsWithKeys.map(key => startsWithMatch[key]);
  const anyMatch = cryptoData.filter(
    crypto =>
      crypto.name.toLowerCase().match(_input.toLowerCase()) ||
      crypto.symbol.toLowerCase().match(_input.toLowerCase())
  );
  const sortedAnyKeys = Object.keys(anyMatch).sort(
    (a, b) => anyMatch[a].name.length - anyMatch[b].name.length
  );
  const sortedAnyMatch = sortedAnyKeys.map(key => anyMatch[key]);
  const list = _.unionBy(sortedExactMatch, sortedStartsWithMatch, sortedAnyMatch, 'id');
  return list;
};
