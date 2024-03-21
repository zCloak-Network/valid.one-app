export default function () {
  return (
    <div className="w-full h-48 bg-white rounded-2xl border border-blue-950 overflow-hidden mt-6">
      <div className="w-full h-11 bg-gray-800 flex items-center px-4">
        <span className="text-white text-sm font-semibold">Quick Actions</span>
      </div>
      <div className="p-4 flex flex-col item-center gap-4">
        <button className="btn w-full">View Connections</button>
        <button className="btn w-full">Submit Feedback</button>
      </div>
    </div>
  );
}
