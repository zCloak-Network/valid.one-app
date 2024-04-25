export const getQueryParams = (key: string) => {
  const search = location.search || location.hash.split("?")[1];
  const params = new URLSearchParams(search);
  return params.get(key);
};

export const validTwitterUrl = (url: string) => {
  const regex = /^https:\/\/(twitter|x)\.com\/.+\/status\/(\d+)/;
  const result = url.match(regex);
  return result ? result[2] : null;
};
