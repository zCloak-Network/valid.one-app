import { useCopyToClipboard } from "react-use";
import { IoCopyOutline } from "react-icons/io5";

export const TextareaWithCopy = function (props: { value: string }) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(props.value);
  };

  return (
    <>
      <div className="relative mt-4 overflow-hidden rounded-lg border ">
        <textarea
          className={"textarea textarea-bordered block w-full"}
          placeholder="present police twin quality river sail coach link give distance palm paddle"
          rows={4}
          value={props.value}
          disabled
        ></textarea>
        <div
          className={`absolute bottom-0 right-0 z-10 bg-white ${
            state.value ? "tooltip" : ""
          }`}
          data-tip={state.value ? "Copied" : ""}
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
