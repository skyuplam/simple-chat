import { includes, linkifyString } from '../string';
import { Match } from 'linkify-it';


describe('includes', () => {
  const includesFoo = includes('foo');
  test.each([
    ['', false],
    ['Fo', false],
    ['fo', false],
    ['fO', false],
    ['ooooof', false],
    ['Foooooo', true],
    ['foooooo', true],
    ['foo', true],
  ])('includesFoo(%s)', (input, expected) => {
    expect(includesFoo(input as string)).toEqual(expected);
  });
});

describe('linkifyString', () => {
  const replaceWith = (match: Match) => `<a>${match.text}</a>`;
  test.each([
    ['', ''],
    ['no link', 'no link'],
    ['looks like a link .com', ['looks like a link .com']],
    ['link.com', ['', '<a>link.com</a>', '']],
    ['some link.com', ['some ', '<a>link.com</a>', '']],
    ['link.com to some', ['', '<a>link.com</a>', ' to some']],
    ['some link.com to some thing.net', ['some ', '<a>link.com</a>', ' to some ', '<a>thing.net</a>', '']],
    ['some link.com to some thing.net today', ['some ', '<a>link.com</a>', ' to some ', '<a>thing.net</a>', ' today']],
  ])('linkifyString(%s)', (txt, expected) => {
    expect(linkifyString(txt as string, replaceWith)).toEqual(expected);
  });
});
