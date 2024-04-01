import { shortString } from "@/utils";
import { useState, useEffect, useRef } from "react";
import { useCopy } from "@/hooks";

export const ShortAddress = function ({
  value,
  pre = 6,
  after = 4,
  showTip,
  clickCopy,
  ...props
}: {
  value: string;
  pre?: number;
  after?: number;
  showTip?: boolean;
  clickCopy?: boolean;
  [key: string]: any;
}) {
  const [copyText, setCopyText] = useState<string>("");
  const { copyState, copy } = useCopy();
  const copyRef = useRef<string>("");

  useEffect(() => {
    setCopyText(value);
  }, [value]);

  const handleClick = () => {
    if (clickCopy) {
      copy(copyText);
      console.log(copyState);
      copyRef.current = copyText;
      setCopyText("Copied!");
      setTimeout(() => {
        setCopyText(copyRef.current);
      }, 1000);
    }
  };

  return showTip ? (
    <span {...props} onClick={handleClick}>
      <span className="tooltip" data-tip={copyText}>
        {shortString(value, pre, after)}
      </span>
    </span>
  ) : (
    <span {...props} onClick={handleClick}>
      {shortString(value, pre, after)}
    </span>
  );
};
