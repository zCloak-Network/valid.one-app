import XIcon from "@/assets/svg/icon/icon_x.svg?react";
import { TextareaWithCopy } from "@/components";

export default (function BindStep2(props: { cont: string }) {
  const retweet = (text: string) => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-col flex gap-4">
        <div className="font-bold text-xs leading-tight tracking-tight  text-slate-500 self-stretch uppercase">
          Step 2:
        </div>
        <div className="font-bold leading-relaxed tracking-wide  text-slate-900 self-stretch">
          Post the signature result on X(Twitter) and provide the link to the
          post
        </div>
      </div>
      <TextareaWithCopy value={props.cont} rows={10} />

      <div
        className="cursor-pointer flex flex-col gap-2 items-center justify-center"
        onClick={() => retweet(props.cont)}
      >
        <div className="flex m-auto bg-blue-700 rounded-[100px] h-14 w-14 justify-center items-center">
          <XIcon className="h-6 w-6" />
        </div>
        <div className="font-semibold text-center text-sm text-slate-900">
          Share on Twitter
        </div>
      </div>
    </div>
  );
});
