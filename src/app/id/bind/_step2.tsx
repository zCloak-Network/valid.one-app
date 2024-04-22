import XIcon from "@/assets/svg/icon/icon_x.svg?react";

export default (function BindStep2(props: { cont: string }) {
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
      <div className=" bg-gray-50 rounded-2xl text-sm p-4 text-gray-500 self-stretch">
        {props.cont}
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
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
          placeholder="e.g.: https://x.com/username/status/"
          className=" w-full input input-bordered"
        />
      </div>
    </div>
  );
});
