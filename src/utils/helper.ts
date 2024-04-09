export const getQueryParams = (key: string) => {
  const search = location.search || location.hash.split("?")[1];
  const params = new URLSearchParams(search);
  return params.get(key);
};
