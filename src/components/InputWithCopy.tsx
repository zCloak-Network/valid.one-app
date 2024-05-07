import { useCopy } from "@/hooks";
import { MdOutlineCopyAll } from "react-icons/md";

export const InputWithCopy = function (props: {
  value?: string | number | null;
  label?: string;
}) {
  const { copy, copyState } = useCopy();
  const valueString =
    props.value === null || props.value === undefined
      ? ""
      : String(props.value);

  const handleCopy = () => {
    if (!valueString) {
      return console.warn("no text to copy", valueString);
    }
    copy(valueString);
  };

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <span className="text-gray-500">{props.label}</span>
        <input type="text" className="grow" value={valueString} readOnly />
        <span
          className={"w-6 h-6 cursor-pointer" + (copyState ? " tooltip" : "")}
          data-tip={copyState ? "Copied" : ""}
          onClick={() => handleCopy()}
        >
          <MdOutlineCopyAll className="opacity-70 w-6 h-6" />
        </span>
      </label>
    </>
  );
};
