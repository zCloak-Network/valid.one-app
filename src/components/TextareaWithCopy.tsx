import { IoCopyOutline } from "react-icons/io5";
import { useCopy } from "@/hooks";

export const TextareaWithCopy = function (props: {
  value: string;
  rows?: number;
  copyValue?: string;
}) {
  const { copy, copyState } = useCopy();

  const handleCopy = () => {
    copy(props.copyValue || props.value);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-lg border ">
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
