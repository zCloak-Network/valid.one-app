import { useCopyToClipboard } from "react-use";
import { MdOutlineCopyAll } from "react-icons/md";

export const InputWithCopy = function (props: {
  value?: string | number | null;
  label?: string;
}) {
  const [_state, copyToClipboard] = useCopyToClipboard();
  const valueString =
    props.value === null || props.value === undefined
      ? ""
      : String(props.value);

  const handleCopy = () => {
    if (!valueString) {
      return console.warn("no text to copy", valueString);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(valueString);
      console.log("clipboard writeText ", valueString);
    } else {
      copyToClipboard(valueString);
      console.log("copyToClipboard ", valueString);
    }
  };

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        {props.label}
        <input type="text" className="grow" value={valueString} readOnly />
        <MdOutlineCopyAll
          className="w-6 h-6 opacity-70"
          onClick={() => handleCopy()}
        />
      </label>
    </>
  );
};
