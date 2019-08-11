export const includes = (
  searchString: string,
) => (target: string = '') => {
  const t = target.toLowerCase();
  const s = searchString.toLowerCase();
  return t.indexOf(s) !== -1;
};
