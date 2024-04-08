export const localPasskey = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("valid-id");
  }

  return null;
};

export function shortString(
  str: string,
  pre: number = 6,
  after: number = 4
): string {
  if (str.length > pre + after) {
    return `${str.slice(0, pre)}...${str.slice(-after)}`;
  }
  return str;
}
