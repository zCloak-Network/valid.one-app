import XIcon from "@/assets/svg/icon/icon_x.svg?react";
import { useState, useMemo, useEffect } from "react";
import { TextareaWithCopy } from "@/components";
import { validTwitterUrl } from "@/utils";

export default (function BindStep2(props: {
  cont: string;
  onChange: (v: string) => void;
}) {
  const [tweetUrl, setTweetUrl] = useState("");

  const retweet = (text: string) => {
    window.open(
      `https://twitter.com/intent/post?text=${encodeURIComponent(text)}`
    );
  };

  const twitterValided = useMemo(() => {
    if (tweetUrl.length === 0) return false;
    return validTwitterUrl(tweetUrl);
  }, [tweetUrl]);

  useEffect(() => {
    if (twitterValided) {
      props.onChange(twitterValided);
    } else {
      props.onChange("");
    }
  }, [twitterValided]);

  return (
    <div className="flex flex-col gap-6 ">
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

      <div className="border-dashed flex flex-col border-t-2 border-[#CDD7E7] mt-4 pt-4 gap-4">
        <div className="font-bold leading-relaxed tracking-wide  text-slate-900 self-stretch">
          Link to the post
        </div>
        <input
          type="text"
          value={tweetUrl}
          onChange={(e) => setTweetUrl(e.target.value.trim())}
          placeholder="e.g.: https://x.com/username/status/"
          className={`w-full input input-bordered${
            twitterValided === null ? " input-warning" : ""
          }`}
        />
      </div>
    </div>
  );
});
