import { useCopyToClipboard } from "react-use";
import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";

export const TextareaWithCopy = function (props: {
  value: string;
  rows?: number;
}) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copyState, setCopyState] = useState(false);

  const handleCopy = () => {
    if (!props.value) {
      return console.warn("no text to copy", props.value);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.value);
      setCopyState(true);
      console.log("clipboard writeText ", props.value);
    } else {
      copyToClipboard(props.value);
      console.log("copyToClipboard ", props.value);
      setCopyState(!!state.value);
    }
  };

  return (
    <>
      <div className="relative mt-4 overflow-hidden rounded-lg border ">
        <textarea
          className={"textarea textarea-bordered block w-full leading-normal"}
          rows={props.rows || 8}
          value={props.value}
          disabled
        ></textarea>
        <div
          className={`absolute bottom-0 right-0 z-10 bg-white ${
            copyState ? "tooltip" : ""
          }`}
          data-tip={copyState ? "Copied" : ""}
        >
          <button
            className="btn btn-ghost btn-sm text-[#125BE4]"
            onClick={() => handleCopy()}
          >
            <IoCopyOutline />
            Copy
          </button>
        </div>
      </div>
    </>
  );
};
