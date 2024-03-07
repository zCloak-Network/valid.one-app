export const hasCurrentPasskey = () => {
  return window.localStorage.getItem("current");
};
