import { useState, useMemo, useEffect } from "react";
import { validTwitterUrl } from "@/utils";

export default (function BindStep3(props: { onChange: (v: string) => void }) {
  const [tweetUrl, setTweetUrl] = useState("");

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
          Step 3:
        </div>
        <div className="font-bold leading-relaxed tracking-wide  text-slate-900 self-stretch">
          Link to the post
        </div>
      </div>

      <div className="flex flex-col gap-4 px-1 pb-1">
        <textarea
          value={tweetUrl}
          onChange={(e) => setTweetUrl(e.target.value.trim())}
          placeholder="e.g.: https://x.com/username/status/"
          className={`w-full textarea textarea-bordered${
            twitterValided === null ? " textarea-warning" : ""
          }`}
        />
      </div>
    </div>
  );
});
