export default (function BindStep1(props: { cont: string }) {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex-col flex gap-4">
        <div className="font-bold text-xs leading-tight tracking-tight  text-slate-500  uppercase">
          Step 1:
        </div>
        <div className="font-bold leading-relaxed tracking-wide  text-slate-900 ">
          Sign the message below
        </div>
      </div>
      <div className=" bg-gray-50 rounded-2xl text-sm p-4 text-gray-500 ">
        {props.cont}
      </div>
    </div>
  );
});
