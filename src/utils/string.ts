/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * String Utilities for common string operations
 */
import Linkify, { Match } from 'linkify-it';
import { reduce, initial, last } from 'lodash';


/**
 * Check if a string contains the `searchString`
 *
 * @param searchString a string to look for
 * @param target target string
 *
 * @returns boolean true if the `target` includes the `searchString`
 */
export const includes = (
  searchString: string,
) => (target = '') => {
  const t = target.toLowerCase();
  const s = searchString.toLowerCase();
  return t.indexOf(s) !== -1;
};

/**
 * Linkify a string using
 * [linkify-it'(https://github.com/markdown-it/linkify-it)
 */
// Instantiate linkify
const linkify = new Linkify();

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
