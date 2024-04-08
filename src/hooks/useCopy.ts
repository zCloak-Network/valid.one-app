import { useCopyToClipboard } from "react-use";
import { useState } from "react";
export function useCopy() {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copyState, setCopyState] = useState(false);

  const copy = (value: string) => {
    if (!value) {
      return console.warn("no text to copy", value);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
      setCopyState(true);
      console.log("clipboard writeText ", value);
    } else {
      copyToClipboard(value);
      console.log("copyToClipboard ", value);
      setCopyState(!!state.value);
    }
  };

  return { copy, copyState };
}
