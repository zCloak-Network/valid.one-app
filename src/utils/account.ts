export const localPasskey = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("valid-id");
  }
  
  return null;
};
