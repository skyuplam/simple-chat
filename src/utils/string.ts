/* eslint-disable @typescript-eslint/no-explicit-any */
import Linkify, { Match } from 'linkify-it';
import { reduce, initial, last } from 'lodash';

const linkify = new Linkify();

export const includes = (
  searchString: string,
) => (target: string = '') => {
  const t = target.toLowerCase();
  const s = searchString.toLowerCase();
  return t.indexOf(s) !== -1;
};

export type ReplaceWith = (match: Match) => any;
const defaultReplaceWith = (match: Match) => match.text;
export function linkifyString(
  str: string,
  replaceWith: ReplaceWith = defaultReplaceWith,
) {
  if (str && linkify.pretest(str)) {
    return reduce(linkify.match(str), (accm, match, idx, urls) => {
      const lastItem = last(accm) || '';
      const initialItems = initial(accm);

      // Offset index
      const idxEndFirst = idx > 0
        ? match.index - urls[idx - 1].lastIndex : match.index;
      const idxEndLast = idx > 0
        ? match.lastIndex - urls[idx - 1].lastIndex : match.lastIndex;

      // Partition
      const firstPart = lastItem.substring(0, idxEndFirst);
      const between = replaceWith(match);
      const lastPart = lastItem.substring(idxEndLast);

      return [...initialItems, firstPart, between, lastPart];
    }, [str] as any[]);
  }
  return str;
}
